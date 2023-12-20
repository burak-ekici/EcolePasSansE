<template>
  <!-- component qui doit s'afficher lors de la creation de compte, demande de valider l'adresse email -->
  <!-- il est en position absolute -->
  <div class="validationContainer">
    <img class="checkImg" src="@/assets/validate.png" alt="validation, check logo">
    <p class="text-h6 p1 font-weight-light text-center">Felicitation, vous êtes connecté !</p>
    <p class="text-h6 p1 font-weight-light text-center">Vous allez recevoir un mail pour finaliser votre inscription</p>
    <p class="text-h6 p2 font-weight-medium text-center">Veuillez valider votre adresse Email </p>
    <router-link to='/' class="text-h6">Aller sur la page d'acceuil</router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits  } from 'vue';
import gsap from 'gsap'

const emit = defineEmits(['validationAnimationFinishied'])
const tl = gsap.timeline()

tl.from('.checkImg', { y: -200, duration : 0.2 , opacity :0},0.3)
tl.from('.p1', { y: -200, duration : 0.6 , opacity :0 , delay:0.1})
tl.from('.p2', { y: -200, duration: 0.9, opacity: 0, delay: 0.2 })

setTimeout(() => {
  emit('validationAnimationFinishied')
},2000)

onMounted(() => {
  const tl = gsap.timeline()

  tl.from('.checkImg', { y: -50, duration : 0.3 , opacity :0 , ease: "power2.out"},0.1)
  tl.from('.p1', { y: -50, duration : 0.3 , opacity :0 , delay:0,  ease: "power2.out"},0.2)
  tl.from('.p2',{ y: -50, duration : 0.3 , opacity :0, ease: "power2.out"},0.3)
  tl.from('a', { y: -50, duration: 0.3, opacity: 0 }, 0.4)
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
  position:relative;
  left:50%;
  transform: translateX(-50%);
}
a:hover{
  text-decoration: underline;
}
</style>