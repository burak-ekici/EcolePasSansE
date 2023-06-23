<template>
  <div class="loginComponentContainer">

    <loginComponent @switch-to-register-section="switchToRegisterSection" />

    <registerComponent @switch-to-login-section="switchToLoginSection" />

    <div class="imageSection" :class="{ isRegisterSection}">
      <img class="logo" src="@/assets/logoEcole.png" alt="logo du site web : Logo pas sans E">
      <div class="imagesContainer" :class="{ isRegisterSection}">
        <img class="image1" src='@/assets/kid-sitting-on-book3.jpg' alt="un enfant assis sur des livres, lisant un livre tout en souriant">
        <img class="image2" src='@/assets/enfant-biceps2-removebg.png' alt="un enfant assis sur des livres, lisant un livre tout en souriant">
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import loginComponent from './LoginComponent.vue'
import registerComponent from './RegisterComponent.vue'

const isRegisterSection: Ref<boolean> = ref(false);

function switchToRegisterSection() : void{
  isRegisterSection.value = true
}

function switchToLoginSection() :void{
  isRegisterSection.value = false
}

</script>

<style scoped lang="scss">
@import "@/styles/settings.scss";

a { 
  text-decoration: none;  /* remove router-link underline */
  color:blue;
  cursor: pointer;
  font-weight:bold
}

.loginComponentContainer {
  background: #fff;
  height: 70vh;
  width: 70vw;
  max-width: 1080px;
  display:flex;
  border-radius: 40px;
  justify-content: space-between;

  .imageSection{
    width:55%;
    background-color: $fourth-color;
    border-radius: 40px;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right:0;
    height:100%;
    will-change: left , right;
    transition:all 0.2s;
    overflow: hidden;

    &.isRegisterSection{
      transform:translateX(-81.8%);
      transition: transform 0.2s;
    }
    .imagesContainer{
      width : 100%;
      display:flex;
      flex-direction: row;
      flex-wrap: nowrap;
      will-change: transform;
      transition: all 0.2s;

      &.isRegisterSection{
        transform:translateX(-85%);
      }
    }

    

    .logo{
      width:100px;
      position: absolute;
      left:10%;
      top:3%;
    }
    .image1, .image2{
      width:90%;
      height:90%;
    }
  }
  
}

.animateRollImageToLeft{
  display:block;
  animation : rollToLeft 2s linear infinite;
}
.animateRollImageToRight{
  animation : rollToRight 0.5s linear;
}

</style>
