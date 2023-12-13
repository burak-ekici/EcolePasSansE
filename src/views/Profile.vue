<template>
    <div class="profilePageContainer pa-8">
        <h2 class="text-center">Mon profile</h2>
        <div class="profileContainer mt-8" style="width: 70%; margin: 0 auto">
            <section class="leftSection text-center" style="width: 100%">
                <v-card class="w-100">
                    <v-card-title class="cardTitle mb-8">{{ user?.value.username ? user.value.username : '' }}</v-card-title>
                    <v-img
                        class="profileImage"
                        width="200px"
                        height="200px"
                        cover
                        :src="user?.value.avatar ? user.value.avatar : '/user-placeholder.png'"
                    ></v-img>
                    <div class="pa-8">
                        <p class="text-left email text-h5 font-weight-bold mt-4">{{ user?.value.email ? user.value.email : '' }}</p>
                        <p class="text-left text-h6">{{ user?.value.username ? user.value.username : '' }}</p>
                        <p class="text-left font-weight-medium">{{ user?.value.firstname ? user.value.firstname : '' }} {{ user?.value.lastname ? user?.value.lastname  : ''  }}</p>
                        <p class="text-left font-weight-medium">{{ user?.value.adress ? user.value.adress : '' }}</p>
                        <p class="text-left font-weight-medium">{{ user?.value.zip_code ? user.value.zip_code : '' }}</p>
                        <p class="text-left font-weight-medium mb-4">{{ user?.value.city ? user.value.city : '' }}</p>
                    </div>
                </v-card>
                <v-btn class="mt-2 bg-teal-accent-4 text-center">editer</v-btn>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const userStore = useUserStore()
const { user : userInfo } = storeToRefs(userStore)

const user = computed(() => {
  if (userInfo) {
    return userInfo
  } else {
    router.push('/login')
  }
  return null
})


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
