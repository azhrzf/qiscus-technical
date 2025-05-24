<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { useUIStore } from '@/stores/ui.ts'
import RoomSearch from './RoomSearch.vue'
import RoomList from './RoomList.vue'

const chatStore = useChatStore()
const uiStore = useUIStore()

const rooms = chatStore.rooms
const showChatView = uiStore.showChatView

</script>

<template>
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
                <RouterLink :to="`/chat/${room.room_id}`">
                    <RoomList :room="room" />
                </RouterLink>
            </div>
        </div>
    </aside>
</template>
