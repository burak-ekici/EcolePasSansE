<template>
  <div class="container">
  <v-window>
    <loginOrRegisterComponent />
  </v-window>
  </div>
</template>

<script lang="ts" setup>
import loginOrRegisterComponent from '@/components/LoginOrCreationForm/LoginOrRegisterComponent.vue'

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/bg.jpg');
  background-position:center;
  background-size: cover;
}
</style>
