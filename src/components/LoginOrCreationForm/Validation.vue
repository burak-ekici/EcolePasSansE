<template>
  <!-- component qui doit s'afficher lorsque la connexion ou la creation de compte est reussie -->
  <!-- il est en position absolute -->
  <div class="validationContainer">
    <img class="checkImg" src="@/assets/validate.png" alt="validation, check logo">
    <p class="text-h4 font-weight-medium text-center">Vous êtes connecté !</p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    router.push('/')
  },2000)
})
</script>

<style scoped>
.validationContainer{
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  top:0%;
  background: #fff;
  z-index : 1;
  border-radius : 40px;
}
.checkImg{
  margin: 0 auto;
  display:block;
  margin-top: 120px;
}
p{
  color:#201568;
}
</style>