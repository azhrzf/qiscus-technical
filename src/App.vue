<script setup lang="ts">
import { RouterView } from 'vue-router'
import RoomPanel from './components/feature/Room/RoomPanel.vue'
</script>

<template>
  <div class="grid grid-cols-12 h-screen bg-[#ffffff] relative overflow-hidden">
    <RoomPanel :rooms="rooms" @selectRoom="selectRoom" />
    <RouterView/>
  </div>
</template>
