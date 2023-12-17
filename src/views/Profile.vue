<template>
  <div class="profilePageContainer pa-8">
    <h2 class="text-center">Mon profile</h2>
    <div class="profileContainer mt-8" style="width: 70%; margin: 0 auto">
      <section class="leftSection text-center" style="width: 100%">
        <v-card class="w-100">
          <v-card-title v-if="user.username" class="cardTitle mb-8">{{
            user.username 
          }}</v-card-title>
          <v-img
            class="profileImage"
            width="200px"
            height="200px"
            cover
            :src="
              user.avatar ? user.avatar : '/user-placeholder.png'
            "
          ></v-img>
          <div v-if="user" class="pa-8">
            <p
              v-if="user.email"
              class="text-left email text-h5 font-weight-bold mt-4"
            >
              {{ user.email  }}
            </p>
            <p v-if="user.username" class="text-left text-h6">
              {{ user.username }}
            </p>
            <p
              v-if="user.firstname && user.lastname"
              class="text-left font-weight-medium"
            >
              {{ user.firstname  }}
              {{ user.lastname  }}
            </p>
            <p v-if="user.adress" class="text-left font-weight-medium">
              {{ user.adress  }}
            </p>
            <p v-if="user.zip_code" class="text-left font-weight-medium">
              {{ user.zip_code }}
            </p>
            <p v-if="user.city" class="text-left font-weight-medium mb-4">
              {{ user.city }}
            </p>
          </div>
        </v-card>
        <v-btn :to="{path : '/edit_profile'}" class="mt-2 bg-teal-accent-4 text-center">editer</v-btn>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userStore = useUserStore();
const { user: userInfo } = storeToRefs(userStore);

const user = computed(() => {
  if (!userInfo.value) {
    router.push("/login");
    return null;
  } else {
    return userInfo.value;
  }
});
</script>

<style scoped>
.cardTitle {
  background-color: #176b87;
  color: white;
}
.profileImage {
  width: 200px;
  height: 00px;
  border-radius: 50%;
  margin: 0 auto;
}
</style>
