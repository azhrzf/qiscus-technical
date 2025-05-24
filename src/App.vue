<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { RouterLink, RouterView } from 'vue-router'
import { Button } from './components/ui/button'
import { Star, Search, Smile, Send, ArrowLeft } from 'lucide-vue-next'
import HelloWorld from './components/HelloWorld.vue'
import RoomSearch from './components/feature/Room/RoomSearch.vue'
import RommList from './components/feature/Room/RoomList.vue'
import MessageList from './components/feature/Message/MessageList.vue'
import MessageProfile from './components/feature/Message/MessageProfile.vue'
import MessageInput from './components/feature/Message/MessageInput.vue'

const chatStore = useChatStore()
const { rooms, selectedRoom, messages } = storeToRefs(chatStore)

const showChatView = ref(false)

const selectRoom = (room: any) => {
  chatStore.selectRoom(room.room_id)
  showChatView.value = true
}

const backToList = () => {
  showChatView.value = false
}

</script>

<template>
  <div class="grid grid-cols-12 h-screen bg-[#ffffff] relative overflow-hidden">
    <aside
      class="col-span-12 md:col-span-4 flex flex-col h-screen border-r border-[#e8e8e8] bg-[#fafafa] absolute md:relative inset-0 transition-transform duration-300 ease-in-out z-10"
      :class="showChatView ? '-translate-x-full md:translate-x-0' : 'translate-x-0'">
      <div class="sticky top-0 z-10 p-5 border-b border-[#e8e8e8] bg-[#fafafa]">
        <div class="relative">
          <RoomSearch />
        </div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="room in rooms" :key="room.room_id"
          class="hover:bg-[#f6f6f6] cursor-pointer border-b border-[#f5f5f5]">
          <RommList :room="room" @click="selectRoom(room)" />
        </div>
      </div>
    </aside>
    <main
      class="col-span-12 md:col-span-8 flex-1 flex flex-col absolute md:relative inset-0 transition-transform duration-300 ease-in-out"
      :class="showChatView ? 'translate-x-0' : 'translate-x-full md:translate-x-0'">
      <div class="p-4 border-b border-[#e8e8e8] bg-white">
        <MessageProfile v-if="selectedRoom" :selectedRoom="selectedRoom" :backToList="backToList" />
      </div>
      <div class="flex-1 overflow-y-auto p-5 space-y-4">
        <MessageList v-for="message in messages" :key="message.id" :message="message" />
      </div>
      <div class="p-4 border-t border-[#e8e8e8] bg-white">
        <MessageInput />
      </div>
    </main>
  </div>
</template>