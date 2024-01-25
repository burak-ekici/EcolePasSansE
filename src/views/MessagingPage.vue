<template>
  <div class="bg-secondary-color container" style="height: 100vh;width:calc(100vw - 72px); overflow: hidden; display: flex;">
    <div class="aside" :class="{'noUserSelected' : !selectedUser}">
      <v-list>
        <v-list-item><h2 class="mb-6">Messagerie</h2></v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="selectUser(1)" class="pt-4 pb-4" prepend-avatar="https://randomuser.me/api/portraits/men/82.jpg" title="Serge Amonin" value="1"></v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="selectUser(2)" class="pt-4 pb-4" prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Beatrice romero" value="2"></v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="selectUser(3)" class="pt-4 pb-4" prepend-avatar="https://randomuser.me/api/portraits/women/80.jpg" title="Rick K. Reed" value="3"></v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="selectUser(4)" class="pt-4 pb-4" prepend-avatar="https://randomuser.me/api/portraits/men/84.jpg" title="Noël Gregoire" value="4"></v-list-item>
        <v-divider></v-divider>
      </v-list>
    </div>
    <Tchat style="width:75%" :messages="messagesToProps" />
  </div>
</template>

<script lang="ts" setup>
import Tchat from '@/components/Tchat.vue';
import { ref, Ref } from 'vue';
import { useMessageStore } from '@/store/messageStore';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const messageStore = useMessageStore();

const { user } = storeToRefs(userStore);

if(user.value?.id){
  messageStore.fetchSalon(user.value.id)
}




</script>

<style scoped>

.aside{
  width:25%;
  max-width:300px;
  height:100%;
  background: #fff;
  border-right:1px solid #c7c6c6;
  transition: all 0.3s;
}
.noUserSelected{
  width:100%;
  max-width:100%;
  position:absolute;
  z-index: 1;
}
</style>
