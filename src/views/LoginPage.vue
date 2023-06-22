<template>
  <div class="container">
    <v-window v-model="screen">
      <v-window-item value="loginScreen">
        <loginComponent @switch-screen="switchScreen" />
      </v-window-item>
      <v-window-item eager value="registerScreen"> <!-- eager permet de charger le component car sinon il y a un bug dans l'animation -->
        <registerComponent @switch-screen="switchScreen" />
      </v-window-item>
    </v-window>
  </div>
</template>

<script lang="ts" setup>
import loginComponent from '@/components/LoginComponent.vue'
import registerComponent from '@/components/RegisterComponent.vue'
import { ref } from 'vue';

function switchScreen(val: string) {
  console.log(val)
  screen.value = val
}
const screen = ref('loginScreen')
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../public/bg.jpg');
  background-position:center;
  background-size: cover;
}
</style>
