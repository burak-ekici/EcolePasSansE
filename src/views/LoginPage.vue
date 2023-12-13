<template>
  <div class="container bg-secondary-color">
  <v-window >
    <SwitchLogOrRegisterComponent />
  </v-window>
  </div>
</template>

<script lang="ts" setup>
import SwitchLogOrRegisterComponent from '@/components/LoginOrCreationForm/SwitchLogOrRegisterComponent.vue'

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position:center;
  background-size: cover;
}
</style>
