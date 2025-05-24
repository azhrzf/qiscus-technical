<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-vue-next'
</script>

<template>
    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4f5665] w-4 h-4" />
    <Input placeholder="Search people or message"
        class="pl-10 bg-white border-[#e8e8e8] text-[#4f5665] placeholder:text-[#c4c4c4]" />
</template>