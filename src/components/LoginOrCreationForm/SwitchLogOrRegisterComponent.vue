<template>
  <div class="loginComponentContainer">

    <loginComponent @loginValidated="isValidate = true" @switch-to-register-section="switchToRegisterSection" />

    <registerComponent @registerValidated="isRegistered = true"  @switch-to-login-section="switchToLoginSection" />

    <transition name="validationTransition">
      <ConnexionValidation v-if="isValidate" class="validationComponent" />
    </transition>

    <transition name="validationTransition">
      <registerValidation v-if="isRegistered" class="validationComponent" />
    </transition>

    <div class="imageSection" :class="{ isRegisterSection}">
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import loginComponent from './LoginComponent.vue'
import registerComponent from './RegisterComponent.vue'
import ConnexionValidation from './ConnexionValidation.vue'
import registerValidation from './RegisterValidation.vue'

const isRegisterSection: Ref<boolean> = ref(false);
const isValidate : Ref<boolean> = ref(false)
const isRegistered: Ref<boolean> = ref(false)
  
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
  overflow: hidden;


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
    background: url('@/assets/logoEcole.png') ;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    

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
      left:4.5%;
      top:3%;
      border-radius: 50%;
    }
    .image1, .image2{
      width:100%;
      height:100%;
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

.validationTransition-enter-from{
  transform: translateY(-500px);
  transition: all 0.5s;
}
.validationTransition-enter-active{
  transition: all 0.5s;
}

</style>
