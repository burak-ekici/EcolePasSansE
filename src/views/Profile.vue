<template>
  <div class="profilePageContainer pa-8">
    <h2 class="text-center">Mon profile</h2>
    <div class="profileContainer mt-8" style="width:70%; margin: 0 auto">
    <section class="leftSection text-center" style="width:fit-content">
      <v-card width="400px">
        <v-card-title class="cardTitle text-center mb-8">Roxxstar</v-card-title>
        <v-img class="profileImage" width="200px" height="200px" cover src="@/assets/Rocket-178316.jpg"></v-img>
        <p class="email text-h5 font-weight-bold mt-4 text-center">Burakroxx@gmail.com</p>
        <p class="text-h6 text-center">Pseudonyme</p>
        <p class="text-center font-weight-medium">Nom prenom</p>
        <p class="text-center font-weight-medium">Adresse</p>
        <p class="text-center font-weight-medium">69200</p>
        <p class="text-center font-weight-medium mb-4">Ville</p>
      </v-card>
      <v-btn class="mt-2 bg-teal-accent-4 text-center">editer</v-btn>
    </section>
      
    </div>
  </div>
</template>

<script setup lang="ts">
</script> 

<style scoped>
.cardTitle{
  background-color: #176B87;
  color:white
}
.profileImage{
  width:200px;
  height:00px;
  border-radius: 50%;
  margin:0 auto;
}
</style>