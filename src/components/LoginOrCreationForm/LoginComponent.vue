<template>
  <div class="loginSection pa-8 pt-16">
      <div>
        <h3 class="text-h6 font-weight-medium  mt-12 text-medium-emphasis">De retour parmis nous.</h3>
        <h1 class="font-weight-bold mt-n2 text-h4">Bienvenue</h1>
        <h4 class="text-body-2 text-medium-emphasis">Vous n'avez pas encore de compte ? <a @click="switchToRegisterSection" >Creer un compte</a></h4>
        <v-form class="pt-12">
          <v-text-field density="comfortable" bg-color="#fcfcfc" class="mb-2" type="email"  base-color="#000" label="Email" append-inner-icon="mdi-email">
          </v-text-field>
          <v-text-field density="comfortable" class="mb-2" type="password" bg-color="#fcfcfc" base-color="#000" label="Mot de passe" append-inner-icon="mdi-lock">
          </v-text-field>
          <v-btn color="#176B87" class="text-white py-6" block type="submit" >Se connecter</v-btn>
        </v-form>
      </div>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['switchToRegisterSection'])

function switchToRegisterSection() : void{
  emit('switchToRegisterSection')
}

</script>

<style scoped lang="scss">

a { 
  text-decoration: none;  /* remove router-link underline */
  color:blue;
  cursor: pointer;
  font-weight:bold
}

.loginSection{
  width:45%;
}

</style>
