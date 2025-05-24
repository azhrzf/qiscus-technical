import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import roomsData from '@/assets/list_rooms.json'
import messageData from '@/assets/list_messages.json'

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

export interface ListRoomsData {
    data: {
        customer_rooms: Room[]
    }
    meta: {
        current_total: number
        cursor_after: string
        cursor_before: string
    }
    status: number
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
    const selectedRoomId = ref<string | null>(null)

    const roomMessages = ref<Record<string, Message[]>>(messageData as Record<string, Message[]>)

    const selectedRoom = computed(() =>
        rooms.value.find(room => room.room_id === selectedRoomId.value) || null
    )

    const messages = computed(() => {
        if (!selectedRoomId.value) return []
        return roomMessages.value[selectedRoomId.value] || []
    })

    function selectRoom(roomId: string) {
        selectedRoomId.value = roomId
    }

    function sendMessage(text: string, product?: ProductMessage) {
        if (!selectedRoomId.value) return;

        let newMessage: Message;

        if (product) {
            newMessage = {
                id: Date.now().toString(),
                room_id: selectedRoomId.value,
                sender_id: 'me',
                sender_type: 'agent',
                text: product.name,
                timestamp: new Date().toISOString(),
                type: 'product',
                product
            };
        } else {
            if (!text.trim()) return;
            newMessage = {
                id: Date.now().toString(),
                room_id: selectedRoomId.value,
                sender_id: 'me',
                sender_type: 'agent',
                text,
                timestamp: new Date().toISOString(),
                type: 'text'
            };
        }

        if (!roomMessages.value[selectedRoomId.value]) {
            roomMessages.value[selectedRoomId.value] = [];
        }

        roomMessages.value[selectedRoomId.value].push(newMessage);

        const room = rooms.value.find(r => r.room_id === selectedRoomId.value);
        if (room) {
            room.last_comment_sender = "a.zaidan.f.azf616@gmail.com";
            room.last_comment_sender_type = "agent";
            room.last_comment_text = text;
            room.last_comment_timestamp = newMessage.timestamp;
        }
    }

    for (const room of rooms.value) {
        if (roomMessages.value[room.room_id]) {
            (room as any).messages = roomMessages.value[room.room_id]
        } else {
            (room as any).messages = []
        }
    }

    return {
        rooms,
        selectedRoomId,
        selectedRoom,
        roomMessages,
        messages,
        selectRoom,
        sendMessage
    }
})