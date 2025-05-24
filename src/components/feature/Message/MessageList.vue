<script setup lang="ts">
import { formatTimestamp } from '@/lib/utils';
import type { Message } from '@/stores/chat';

defineProps<{
    message: Message
}>();

</script>

<template>
    <div class="flex w-full" :class="{
        'justify-start': message.sender_type === 'customer',
        'justify-end': message.sender_type === 'agent',
        'justify-center': message.sender_type === 'system'
    }">
        <div class="rounded-2xl mb-1" :class="{
            'bg-[#f5f5f5] rounded-tl-md p-3 mr-10 lg:max-w-6/12': message.sender_type === 'customer',
            'bg-[#21978b] rounded-tr-md p-3 ml-10 lg:max-w-6/12': message.sender_type === 'agent',
            'bg-[#f5f5f5] rounded-md p-2 lg:max-w-5/12': message.sender_type === 'system'
        }">
            <p :class="{
                'text-[#141414] text-sm': message.sender_type === 'customer',
                'text-white text-sm': message.sender_type === 'agent',
                'text-[#4f5665] text-xs': message.sender_type === 'system'
            }">{{ message.text }}</p>
            <span v-if="message.sender_type !== 'system'" class="text-[10px]" :class="{
                'text-[#141414] text-sm': message.sender_type === 'customer',
                'text-white text-sm': message.sender_type === 'agent'
            }">
                {{ formatTimestamp(message.timestamp) }}
            </span>
        </div>
    </div>
</template>