import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import roomsData from '@/data/list_rooms.json'
import messageData from '@/data/list_messages.json'

export interface Room {
  channel_id: number
  contact_id: number | null
  id: number
  is_calling: boolean
  is_handled_by_bot: boolean
  is_resolved: boolean
  is_waiting: boolean
  last_comment_sender: string
  last_comment_sender_type: string
  last_comment_text: string
  last_comment_timestamp: string
  last_customer_comment_text: string | null
  last_customer_timestamp: string
  name: string
  room_badge: string | null
  room_id: string
  room_type: string
  source: string
  user_avatar_url: string
  user_id: string
}

export interface ProductMessage {
  name: string
  price: number
  image: string
}

export interface Message {
  id: string
  room_id: string
  sender_id: string
  sender_type: string
  text: string
  timestamp: string
  type?: 'text' | 'product'
  product?: ProductMessage
}

export const useChatStore = defineStore('chat', () => {
  const rooms = ref<Room[]>(roomsData.data.customer_rooms)
  const roomMessages = ref<Record<string, Message[]>>(messageData as Record<string, Message[]>)
  const selectedRoomId = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const selectedRoom = computed(() =>
    selectedRoomId.value ? rooms.value.find(room => room.room_id === selectedRoomId.value) || null : null
  )

  const currentMessages = computed(() =>
    selectedRoomId.value ? roomMessages.value[selectedRoomId.value] || [] : []
  )

  const getRoomById = computed(() =>
    (roomId: string) => rooms.value.find(room => room.room_id === roomId) || null
  )

  const getMessagesByRoomId = computed(() =>
    (roomId: string) => roomMessages.value[roomId] || []
  )

  const roomsCount = computed(() => rooms.value.length)

  const hasMessages = computed(() =>
    selectedRoomId.value ? (roomMessages.value[selectedRoomId.value]?.length || 0) > 0 : false
  )

  function selectRoom(roomId: string) {
    if (rooms.value.find(room => room.room_id === roomId)) {
      selectedRoomId.value = roomId
      error.value = null
    } else {
      error.value = `Room with ID ${roomId} not found`
    }
  }

  function clearSelection() {
    selectedRoomId.value = null
    error.value = null
  }

  function sendMessage(text: string, product?: ProductMessage) {
    if (!selectedRoomId.value) {
      error.value = 'No room selected'
      return false
    }

    if (!text.trim() && !product) {
      error.value = 'Message cannot be empty'
      return false
    }

    try {
      const newMessage: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        room_id: selectedRoomId.value,
        sender_id: 'me',
        sender_type: 'agent',
        text: product ? product.name : text.trim(),
        timestamp: new Date().toISOString(),
        type: product ? 'product' : 'text',
        ...(product && { product })
      }

      if (!roomMessages.value[selectedRoomId.value]) {
        roomMessages.value[selectedRoomId.value] = []
      }

      roomMessages.value[selectedRoomId.value].push(newMessage)

      updateRoomLastMessage(selectedRoomId.value, newMessage)

      error.value = null
      return true
    } catch (err) {
      error.value = 'Failed to send message'
      return false
    }
  }

  function updateRoomLastMessage(roomId: string, message: Message) {
    const room = rooms.value.find(r => r.room_id === roomId)
    if (room) {
      room.last_comment_sender = 'agent@example.com'
      room.last_comment_sender_type = 'agent'
      room.last_comment_text = message.text
      room.last_comment_timestamp = message.timestamp
    }
  }

  function addRoom(room: Room) {
    if (!rooms.value.find(r => r.room_id === room.room_id)) {
      rooms.value.unshift(room)
    }
  }

  function removeRoom(roomId: string) {
    const index = rooms.value.findIndex(room => room.room_id === roomId)
    if (index > -1) {
      rooms.value.splice(index, 1)
      if (selectedRoomId.value === roomId) {
        selectedRoomId.value = null
      }
      delete roomMessages.value[roomId]
    }
  }

  function searchRooms(query: string) {
    return computed(() =>
      rooms.value.filter(room =>
        room.name.toLowerCase().includes(query.toLowerCase()) ||
        room.user_id.toLowerCase().includes(query.toLowerCase()) ||
        room.last_comment_text.toLowerCase().includes(query.toLowerCase())
      )
    )
  }

  function $reset() {
    rooms.value = roomsData.data.customer_rooms
    roomMessages.value = messageData as Record<string, Message[]>
    selectedRoomId.value = null
    isLoading.value = false
    error.value = null
  }

  return {
    rooms,
    roomMessages,
    selectedRoomId,
    isLoading,
    error,
    selectedRoom,
    currentMessages,
    getRoomById,
    getMessagesByRoomId,
    roomsCount,
    hasMessages,
    selectRoom,
  }
})
