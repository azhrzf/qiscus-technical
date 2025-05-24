<script setup lang="ts">
import type { Room } from '@/stores/chat';
import { formatTimestamp } from '@/lib/utils';

interface MessageListProps {
    room: Room;
    selectedRoomId?: string;
}

defineProps<MessageListProps>();
</script>

<template>
    <div class="flex items-center gap-3 p-4">
        <img :src="room.user_avatar_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
            :alt="room.name" class="w-10 h-10 rounded-full" />
        <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <p class="font-semibold text-[#141414]">{{ room.name }}</p>
                <span class="text-[#4f5665] text-xs">{{ formatTimestamp(room.last_comment_timestamp) }}</span>
            </div>
            <p class="text-[#4f5665] text-xs truncate">{{ room.last_comment_text }}</p>
        </div>
    </div>
</template>