<template>
  <div>
    <button @click="changeLayout">switch to default Layout</button>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/globalStore'

const globalStore = useGlobalStore();

function changeLayout() {
  globalStore.changeLayout()
}
</script>