<template>
  <v-container fluid>
    <v-row justify="center" no-gutters dense class="ma-0">
      <v-col cols="4" class="col">
        <img
          class="image"
          src="../../public/enfant_dans_une_classe.jpg"
          alt="un enfant qui bouquine"
        />
      </v-col>

      <v-col cols="6">
        <v-card elevation="0" class="h-100 formCol">
          <v-row align="start" class="h-100 pa-10"> 
            <v-col cols="12">
              <v-img class="logo mb-12" src="../../public/logoEcole.png" /> 
              <v-form v-model="form">
                <v-container>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    density="compact"
                    label="Email"
                    required
                    clearable
                    hint="Entrez votre adress Email"
                    ><template v-slot:prepend>
                      <v-icon > mdi-email </v-icon>
                    </template>
                  </v-text-field>

                  <v-text-field
                    v-model="password"
                    type="password"
                    :rules="[(v) => !!v || 'password is required']"
                    label="Password"
                    required
                    density="compact"
                    clearable
                    hint="Votre mot de passe doit contenir au moins : une majuscule, une minuscule et un caractére spéciale"
                  >
                    <template v-slot:prepend>
                      <v-icon > mdi-lock </v-icon>
                    </template></v-text-field
                  >

                  <div class="d-flex flex-column">
                    <v-btn
                      color="success"
                      block
                      type="submit"
                      class="validationBtn mt-4"
                      @click.prevent="$emit('switchScreen','loginScreen')"
                    >
                      Se connecter
                    </v-btn>
                  </div>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const form = ref(true);

const emailRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.logo{
  width:100px;
  margin: 0 auto;
}
.image {
  display: block;
  width: 100%;
  height: 100%;
  border-top-left-radius: 3%;
  border-bottom-left-radius: 3%;
}
.formCol {
  border-bottom-right-radius: 3%;
  border-top-right-radius: 3%;
}
</style>
