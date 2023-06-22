<template>
  <div class="switchContainer d-flex">

    <div @click="slideOnSignIn" class="sign-in">
      <p>Se connecter</p>
    </div>

    <div @click="slideOnRegister" class="register">
      <p>Creer un compte</p>
    </div>
    
    <div :class="{'isRegisterPage' : isRegisterPage}" class="insideBlock">
    </div>

  </div>
</template>


<script lang="ts" setup>
import { Ref, ref } from 'vue';


const isRegisterPage : Ref<boolean> = ref(false)

function slideOnRegister() {
  if(isRegisterPage.value !== true) isRegisterPage.value = true
}

function slideOnSignIn() {
  if(isRegisterPage.value !== false) isRegisterPage.value = false
}

</script>

<style scoped>
.switchContainer{
  background-color: #dfdddd;
  width:100%;
  height:50px;
  border-radius: 15px;
  padding:3px;
  display: flex;
  align-items: center;
  position:relative;

}

.sign-in, .register{
  width:50%;
  height:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  color:rgb(0, 0, 0);
  font-weight:bold;
  font-size:0.8rem;
  position: relative;
  cursor:pointer;
  z-index: 1;
}

.insideBlock{
  background-color: #ffffff;
  width:48%;
  height:88%;
  left:0.8%;
  right:0;
  top:6%;
  border-radius: 13px;
  position:absolute;
  font-weight: bold;
  transition: all 0.3s;
}

.isRegisterPage{
  left:51%
}

</style>