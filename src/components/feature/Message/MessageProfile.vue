<script setup lang="ts">
import type { Room } from '@/stores/chat';

defineProps<{
    selectedRoom: Room,
    backToList: () => void
}>();
</script>

<template>
    <div v-if="selectedRoom" class="flex items-center gap-3">
        <Button @click="backToList" size="sm" variant="ghost" class="md:hidden p-2">
            <ArrowLeft class="w-5 h-5" />
        </Button>
        <img :src="selectedRoom?.user_avatar_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
            alt="Suzana Colin" class="w-10 h-10 rounded-full" />
        <div>
            <h3 class="font-medium text-[#141414]">{{ selectedRoom.name }}</h3>
            <p class="text-[#4f5665] text-sm">{{ selectedRoom.user_id }}</p>
        </div>
    </div>
</template>