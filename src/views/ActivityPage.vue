<template>
  <div class="FilesPageContainer" style="width:100% ; min-height:100vh ; display:flex;">
    <div class="aside">
      <v-list-item><h2 class="mb-6">Activitées</h2></v-list-item>
      <v-divider class="mt-n5"></v-divider>
      <section class="filterArea pa-4">
        <h3 class="font-weight-regular mb-8">Filtre</h3>
        <v-form @submit.prevent>
          <!-- Recherche  -->
          <v-text-field v-model="activitysName" clearable type="text" label="Rechercher"></v-text-field>
          <!-- Groupe application payante ?  -->
          <v-radio-group
            v-model="isfreeActivitys"
          >
          <template v-slot:label>
            <div>Application payante :</div>
          </template>
            <v-radio
              label="Oui"
              value="oui"
            ></v-radio>
            <v-radio
              label="Non"
              value="non"
            ></v-radio>
            <v-radio
              label="Tous"
              value="all"
            ></v-radio>
          </v-radio-group>
          <!-- Groupe Statut de l'activité  -->
          <v-radio-group
            v-model="activitysStatus"
          >
          <template v-slot:label>
            <div>Statut de l'activité :</div>
          </template>
            <v-radio
              label="Terminé"
              value="finished"
            ></v-radio>
            <v-radio
              label="En cours"
              value="in process"
            ></v-radio>
            <v-radio
              label="Nouvelle"
              value="new"
            ></v-radio>
            <v-radio
              label="Tous"
              value="all"
            ></v-radio>
          </v-radio-group>
          <!-- Groupe theme application  -->
          <v-combobox
            label="Théme"
            v-model="theme"
            :items="['Tous','Math','Langue','Coding','Logique & Algorythme' ]"
          ></v-combobox>
          <!-- Valition Button -->
          <v-btn
            color="success"
            class="mt-4"
            block
          >Filtrer</v-btn>
          <!-- Reset Button  -->
          <v-btn
          color="warning"
          class="mt-4"
          block
        >
          Reinitialiser
        </v-btn>
        </v-form>
      </section>
    </div>
    
    <section class="activitysContainer pa-8">
      <v-card class="card" v-for="i in 20" :key="i" elevation="3" style="height:400px; width:300px">
        <v-card-title class="bg-teal">
          Lorem Ipsum Dolor
        </v-card-title>
      </v-card>
    </section>
    
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
const activitysName : Ref<string> = ref('')
const isfreeActivitys: Ref<string> = ref('all')
const theme : Ref<string> = ref('Tous')
const activitysStatus : Ref<string> = ref('all')
</script>

<style scoped>
.FilesPageContainer{
  width:100%;
  position: relative;
}
.activitysContainer{
  display:flex;
  flex-flow: row wrap;
  gap : 20px;
  justify-content: flex-start;
  width:100%
}
.card{
  flex-grow: 1;
  flex-shrink: 0;
}

.aside{
  width:25%;
  max-width:300px;
  height:100vh;
  background: #fff;
  border-right:1px solid #d6d6d6;
  transition: all 0.3s;
  position: sticky;
  top:0;
  bottom: 0;
}
</style>