<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import human from 'human-time'
import HelloWorld from './components/HelloWorld.vue'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Star, Search, Smile, Send, ArrowLeft } from 'lucide-vue-next'
import { ref } from 'vue'

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
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4f5665] w-4 h-4" />
          <Input placeholder="Search people or message"
            class="pl-10 bg-white border-[#e8e8e8] text-[#4f5665] placeholder:text-[#c4c4c4]" />
        </div>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="room in rooms" :key="room.id" @click="selectRoom(room)"
          class="flex items-center gap-3 p-4 hover:bg-[#f6f6f6] cursor-pointer border-b border-[#f5f5f5]">
          <img
            :src="room.user_avatar_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
            :alt="room.name" class="w-10 h-10 rounded-full" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <div class="">
                <p class="font-semibold text-[#141414]">{{ room.name }}</p>
                <p class="text-[#4f5665] text-xs  ">{{ room.user_id }}</p>
              </div>
              <span class="text-[#4f5665] text-xs">{{ new Date(room.last_comment_timestamp) < new Date(Date.now() - 24 *
                60 * 60 * 1000) ? new Date(room.last_comment_timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric', year: 'numeric'
                }) : human(new Date(room.last_comment_timestamp)) }}</span>
            </div>
            <p class="text-[#4f5665] text-xs truncate">{{ room.last_comment_text }}</p>
          </div>
        </div>
      </div>
    </aside>

    <main
      class="col-span-12 md:col-span-8 flex-1 flex flex-col absolute md:relative inset-0 transition-transform duration-300 ease-in-out"
      :class="showChatView ? 'translate-x-0' : 'translate-x-full md:translate-x-0'">
      <div class="p-4 border-b border-[#e8e8e8] bg-white">
        <div class="flex items-center gap-3">
          <Button @click="backToList" size="sm" variant="ghost" class="md:hidden p-2">
            <ArrowLeft class="w-5 h-5" />
          </Button>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Suzana Colin" class="w-10 h-10 rounded-full" />
          <div>
            <h3 class="font-medium text-[#141414]">Suzana Colin</h3>
            <p class="text-[#4f5665] text-sm">@suzana</p>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="flex justify-start">
          <div class="max-w-md">
            <div class="bg-[#f5f5f5] rounded-2xl rounded-tl-md p-3 mb-1">
              <p class="text-[#141414] text-sm">next time you'll be awake at this hour why not now</p>
            </div>
          </div>
        </div>
        <div class="flex justify-start">
          <div class="max-w-md">
            <div class="bg-[#f5f5f5] rounded-2xl rounded-tl-md p-3 mb-1">
              <p class="text-[#141414] text-sm">
                Didn't I tell you not to put your phone on charge just because it's the weekend?
              </p>
            </div>
            <div class="flex items-center gap-2 ml-3">
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="User"
                class="w-5 h-5 rounded-full" />
              <div class="flex gap-1">
                <span class="text-lg">😴</span>
                <span class="text-lg">😴</span>
                <span class="text-lg">😴</span>
              </div>
              <span class="text-[#4f5665] text-xs">Sat 5:10 AM</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="max-w-md">
            <div class="bg-[#21978b] rounded-2xl rounded-tr-md p-3 mb-1">
              <p class="text-white text-sm">
                i woke up calmnnn i put it on the charger the phone was turned off next to me i took it out while i
                was sleeping hsadfkagshdafgsojf i slept early girl i slept at 3
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="max-w-md">
            <div class="bg-[#21978b] rounded-2xl rounded-tr-md p-3 mb-1">
              <p class="text-white text-sm">
                While you win in love, you continue to win in other things dhdhdhdn
              </p>
            </div>
            <div class="flex justify-end items-center gap-2 mr-3">
              <span class="text-lg">🔥</span>
              <span class="text-lg">🔥</span>
              <span class="text-[#4f5665] text-xs">Sat 5:15 AM</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-[#e8e8e8] bg-white">
        <div class="flex items-center gap-3">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Zakk Wylde" class="w-10 h-10 rounded-full" />
          <div class="flex-1 flex items-center gap-2">
            <div class="flex-1 relative">
              <Input placeholder="Start a new message"
                class="pr-10 border-[#e8e8e8] bg-[#fbfbfd] placeholder:text-[#c4c4c4]" />
              <Button size="sm" variant="ghost" class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
                <Smile class="w-4 h-4 text-[#4f5665]" />
              </Button>
            </div>
            <Button size="sm" class="bg-[#21978b] hover:bg-[#1a7a6f] h-10 w-10 p-0">
              <Send class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>