<script setup lang="ts">
import { ref } from 'vue'
import type { Room } from '@/stores/chat';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-vue-next';

defineProps<{
    selectedRoom: Room,
    backToList: () => void
}>();

const fallbackImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
const imageError = ref<Record<string, boolean>>({})

const handleImageError = (roomId: string) => {
    imageError.value[roomId] = true
}

const getImageSrc = (room: Room) => {
    if (imageError.value[room.room_id] || !room.user_avatar_url) {
        return fallbackImage
    }
    return room.user_avatar_url
}
</script>

<template>
    <div v-if="selectedRoom" class="flex items-center gap-3">
        <Button @click="backToList" size="sm" variant="ghost" class="md:hidden p-2">
            <ArrowLeft class="w-5 h-5" />
        </Button>
        <img :src="getImageSrc(selectedRoom)" :alt="selectedRoom.name" @error="handleImageError(selectedRoom.room_id)"
            class="w-10 h-10 rounded-full object-cover" />
        <div>
            <h3 class="font-medium text-[#141414]">{{ selectedRoom.name }}</h3>
            <p class="text-[#4f5665] text-sm">{{ selectedRoom.user_id }}</p>
        </div>
    </div>
</template>