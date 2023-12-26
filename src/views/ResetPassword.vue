<template>
  <div class="resetPasswordContainer">
      <v-card class="pa-8 py-2 card" style="position:relative">
        <v-card-title class="cardTitle text-h5 text-center">Recuperation du mot de passe</v-card-title>
        <p class="text-center  text-medium-emphasis text-caption mb-4">Nous allons vous envoyer un mail pour modifier votre mot de passe</p>
        <v-form ref="form" class="form mt-16">
          <v-text-field v-model="email" :rules="[rules.isValidEmail, rules.required]" color="#176B87" variant="outlined" label="Entrez votre Email"></v-text-field>
          <v-btn @click="sendPasswordResetEmail" class="btn">Envoyer</v-btn>
        </v-form>
      </v-card>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore()

const form = ref(null)
const email = ref('')

const rules = {
  isValidEmail: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Adresse email invalide';
  },
  required: (value) => {
    return !!value || 'Veuillez entrer une valeur valide'
  }
}

async function sendPasswordResetEmail() {
  const isFormValid = await form.value.validate()
  if (isFormValid.valid) {
    await userStore.resetPassword(email.value);
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/settings.scss";

.form{
  width:100%;
  margin:0 auto;
}
.resetPasswordContainer{
  display:flex;
  height:100vh;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.btn{
  display:block;
  width:100%;
  margin-bottom: 1rem;
  background: $secondary-color;
  color:white
}
*{
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;   
}

</style>