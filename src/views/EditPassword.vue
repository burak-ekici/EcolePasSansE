<template>
  <div class="resetPasswordContainer">
    <v-card class="pa-8 py-2 card" style="position: relative">
      <v-card-title class="cardTitle text-h5 text-center"
        >Modification du mot de passe</v-card-title
      >
      <v-form ref="form" class="form mt-16" @submit.prevent="editPasswordOnSupabase">
        <v-text-field
          v-model="newPassword"
          :rules="[rules.required, rules.minLength(8), rules.maxLength(25)]"
          color="#176B87"
          variant="outlined"
          label="Entrez votre nouveau mot de passe"
        ></v-text-field>
        <v-btn class="btn" type="submit">Envoyer</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import useNotifications from "@/composables/useNotifications";
const { addNotification } = useNotifications()
const userStore = useUserStore()


const newPassword: Ref<string> = ref('')
const form = ref(null)
  
async function editPasswordOnSupabase() {
  const isValid = await form.value.validate()
  if (isValid.valid) {
    await userStore.updatePassword(newPassword.value)
  } else {
    addNotification({
      message: `Veuillez entrer un mot de passe valide`,
      type: "error",
    });
  }
}


const rules = {
  required: (value) => {
    return !!value || "Veuillez entrer une valeur valide";
  },
  minLength: (minLength) => {
    return (value) =>
      value.length < minLength
        ? "Le mot de passe doit contenir au minimum " +
          minLength +
          " charactéres"
        : true;
  },
  maxLength: (maxLength) => {
    return (value) =>
      value.length > maxLength
        ? `Le mot de passe doit contenir au maximum ${maxLength} charactéres`
        : true;
  }
};
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
