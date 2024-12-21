<script setup>
import Sidebar from './components/Sidebar.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex h-screen">
    <Sidebar/>
    <div class="w-full px-6 py-8 bg-surface-50 dark:bg-surface-950">
      <RouterView/>
    </div>
  </div>
</template>