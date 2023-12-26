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
      <v-form  ref="form" :disabled="!isRegisterButtonActive" fast-fail class="mt-8" @submit.prevent="registeraccount">
        <v-combobox
          :rules="[rules.isValidProfile, rules.required]"
          label="Profile"
          :items="profileList.value"
          v-model="profile"
          variant="outlined"
        ></v-combobox>
        <v-text-field
          :rules="[rules.required, rules.minLength(3), rules.maxLength(25)]"
          class="mb-2"
          type="text"
          density="compact"
          bg-color="#fcfcfc"
          label="Nom d'utilisateur"
          append-inner-icon="mdi-account"
          v-model="username"
          variant="outlined"
        >
        </v-text-field>
        <v-text-field
          :rules="[rules.isValidEmail, rules.required]"
          class="mb-2"
          type="email"
          density="compact"
          bg-color="#fcfcfc"
          label="Email"
          append-inner-icon="mdi-email"
          v-model="email"
          variant="outlined"
        >
        </v-text-field>
        <v-text-field
          :rules="[rules.required, rules.minLength(8), rules.maxLength(25)]"
          class="mb-2"
          type="password"
          density="compact"
          bg-color="#fcfcfc"
          label="Mot de passe"
          append-inner-icon="mdi-lock"
          v-model="password"
          variant="outlined"
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
const profile: Ref<string> = ref('')
const form = ref(null)
const isRegisterButtonActive : Ref<boolean> = ref(true)
const userStore = useUserStore();
const profileStore = useProfileStore();
const { profiles } = storeToRefs(profileStore)
const rules = {
  isValidEmail: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Adresse email invalide';
  },
  required: (value) => {
    return !!value || 'Veuillez entrer une valeur valide'
  },
  minLength: ( minLength) => {
    return (value) => value.length < minLength ? 'Le mot de passe doit contenir au minimum ' + minLength + ' charactéres' : true
  },
  maxLength: (maxLength) => {
    return (value) => value.length > maxLength ? `Le mot de passe doit contenir au maximum ${maxLength} charactéres` : true
  },
  isValidProfile: (value) => {
    return profileList.value.value.includes(value) ? true : "le nom de profile n'existe pas, verifiez la syntaxe"
  },
}


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
  const isFormValid = await form.value.validate()
  if (isFormValid.valid) {
    try {
      isRegisterButtonActive.value = false;
      const profile_id = await profileStore.fetchProfileIdByName(profile.value)
      if (profile_id !== null) {
        const response = await userStore.createAccount({ email: email.value, password: password.value, username: username.value, profile_id: profile_id })
        isRegisterButtonActive.value = true;
        // ajoute un utilisateur dans la table Users
        // à ne pas confondre avec la creation d'account
        if (response === null) {
          const error = { from: 'fonction registeraccount', message: 'Une erreur est subvenue lors de la creation du compte' }
          throw error
        } else {
          form.value.reset()
          emit('registerValidated')
        }
      } else {
        throw new Error('erreur lors de la recuperation du profile_id via la varibla peorile qui contient le nom du profile') 
      }
      
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('erreur dans le formulaire')
  }
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
