<template>
  <!-- comporte le texte et le formulaire de creation de compte ( section de droite ) -->
  <div class="registerSection pa-8 pt-16">
    <div>
      <h3
        class="text-h6 font-weight-medium text-button mt-12 text-medium-emphasis"
      >
        Creer un compte
      </h3>
      <h1 class="font-weight-bold mt-n2 text-h4">Gratuitement.</h1>
      <h4 class="text-body-2 text-medium-emphasis">
        Vous avez dejà un compte ?
        <a @click="switchToLoginSection">Se connecter</a>
      </h4>
      <v-form class="mt-12" @submit.prevent="registeraccount">
        <v-text-field
          class="mb-2"
          type="text"
          density="compact"
          bg-color="#fcfcfc"
          label="Nom d'utilisateur"
          append-inner-icon="mdi-account"
          v-model="username"
        >
        </v-text-field>
        <v-text-field
          class="mb-2"
          type="email"
          density="compact"
          bg-color="#fcfcfc"
          label="Email"
          append-inner-icon="mdi-email"
          v-model="email"
        >
        </v-text-field>
        <v-text-field
          class="mb-2"
          type="password"
          density="compact"
          bg-color="#fcfcfc"
          label="Mot de passe"
          append-inner-icon="mdi-lock"
          v-model="password"
        >
        </v-text-field>
        <v-btn :active="isRegisterButtonActive" :loading="isRegisterButtonLoading" color="#176B87" class="text-white py-6" block type="submit"
          >Creer</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useUserStore } from '@/store/userStore';

const username : Ref<string> = ref('');
const email : Ref<string> = ref('');
const password: Ref<string> = ref('');
const isRegisterButtonActive : Ref<boolean> = ref(true)
const isRegisterButtonLoading : Ref<boolean> = ref(false)

const userStore = useUserStore();


const emit = defineEmits(['switchToLoginSection','registerValidated'])

function switchToLoginSection() : void{
  emit('switchToLoginSection')
}

async function registeraccount() {
  try {
    isRegisterButtonActive.value = false;
    isRegisterButtonLoading.value = true;
    const response = await userStore.createAccount(email.value, password.value)
    isRegisterButtonActive.value = true;
    isRegisterButtonLoading.value = false;
    if (!response.user) {
      const error = { from : 'fonction registeraccount' , message : 'Une erreur est subvenue lors de la creation du compte'}
      throw error
    } else {
      emit('registerValidated')
    }
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
  // emit('registerValidated')
}

</script>

<style scoped lang="scss">

a { 
  text-decoration: none;  /* remove router-link underline */
  color:blue;
  cursor: pointer;
  font-weight:bold
}

.registerSection{
  width:45%;
}


</style>
