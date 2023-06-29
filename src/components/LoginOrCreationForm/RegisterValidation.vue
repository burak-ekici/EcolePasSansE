<template>
  <!-- component qui doit s'afficher lors de la creation de compte, demande de valider l'adresse email -->
  <!-- il est en position absolute -->
  <div class="validationContainer">
    <img class="checkImg" src="@/assets/validate.png" alt="validation, check logo">
    <p class="text-h6  font-weight-light text-center">Vous allez recevoir un mail pour finaliser votre inscription</p>
    <p class="text-h6 font-weight-medium text-center">Veuillez valider votre adresse Email !</p>
    <a @click="closeRegisterPage">retourner sur la page de connexion</a>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';

const emit = defineEmits(['closeRegisterPage']);

function closeRegisterPage() {
  emit('closeRegisterPage')
}

onMounted(() => {
  setTimeout(() => {
    router.push('/login')
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
a{
  text-decoration: none;
  color:blue;
  display:inline-block;
  margin:0 auto;
  cursor: pointer;
}
a:hover{
  text-decoration: underline;
}
</style>