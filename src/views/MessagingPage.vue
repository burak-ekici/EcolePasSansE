<template>
  <div class="bg-secondary-color container" style="height: 100vh;width:100vw; overflow: hidden; display: flex;">
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
    <Tchat :messages="messagesToProps" />
  </div>
</template>

<script lang="ts" setup>
import Tchat from '@/components/Tchat.vue';
import messages from '../../MessageData.json';
import { Ref, computed, ref } from 'vue';

const selectedUser :Ref<number | null> = ref(null)
const filteredMessages = messages.filter(el => el.to_user_id !== el.from_user_id);
console.log(filteredMessages);
function selectUser(id: number): void {
  selectedUser.value = id
  console.log(selectedUser.value)
}
const messagesToProps = computed(() => {
  return filteredMessages.filter(message => message.to_user_id === selectedUser.value && message.from_user_id === 4)
}
)

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
