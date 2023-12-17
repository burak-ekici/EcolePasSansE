<template>
  <!-- comporte le texte et le formulaire de creation de compte ( section de droite ) -->
  <div class="registerSection pa-8 pt-8">
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
      <v-form class="mt-8" @submit.prevent="registeraccount">
        <v-combobox
          label="Profile"
          :items="profileList.value"
          v-model="profile"
        ></v-combobox>
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
        <v-btn :active="isRegisterButtonActive" :loading="!isRegisterButtonActive" color="#176B87" class="text-white py-6" block type="submit"
          >Creer</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/store/userStore';
import { useProfileStore } from '@/store/profileStore';
import { storeToRefs } from 'pinia';

const username : Ref<string> = ref('');
const email : Ref<string> = ref('');
const password: Ref<string> = ref('');
const profile : Ref<string> = ref('')
const isRegisterButtonActive : Ref<boolean> = ref(true)

const userStore = useUserStore();
const profileStore = useProfileStore();

const { profiles } = storeToRefs(profileStore)


onMounted(async () => {
  await profileStore.fetchProfiles()
})

const profileList = computed(() => {
  return  profiles
})


const emit = defineEmits(['switchToLoginSection','registerValidated'])

function switchToLoginSection() : void{
  emit('switchToLoginSection')
}

async function registeraccount() {
  try {
    // on a besoin des deux variable car un bouton en loading
    // est toujours cliquable, hors on veux prevenir cette etat
    isRegisterButtonActive.value = false;
    const response = await userStore.createAccount({ email : email.value, password :password.value, username : username.value, profile :profile.value })
    isRegisterButtonActive.value = true;
    // ajoute un utilisateur dans la table Users
    // à ne pas confondre avec la creation d'account
    if (!response.user) {
      const error = { from : 'fonction registeraccount' , message : 'Une erreur est subvenue lors de la creation du compte'}
      throw error
    } else {
      emit('registerValidated')
    }
  } catch (error) {
    console.log(error)
    if (error.message) {
      alert(error.message)
    }
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
