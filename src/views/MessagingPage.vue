<template>
  <div
    class="bg-secondary-color container"
    style="
      height: 100vh;
      width: calc(100vw - 72px);
      overflow: hidden;
      display: flex;
    "
  >
    <div class="aside">
      <v-list>
        <v-list-item>
          <h2 class="mb-6">Discussion</h2>
        </v-list-item>
        <template v-for="discussion in discussions" :key="discussion.id">
          <v-divider></v-divider>
          <v-list-item
            @click="selectedDiscussion = discussion.id"
            class="pt-4 pb-4"
            prepend-avatar="https://randomuser.me/api/portraits/men/82.jpg"
            title="Serge Amonin"
            value="1"
          ></v-list-item>
          <v-divider></v-divider>
        </template>
        <template v-if="discussions.length === 0">
          <v-list-item>Aucune discussion en cours</v-list-item>
        </template>

        <v-list-item>
          <v-btn color="#5865f2" class="text-white" @click="toggleDropdown"
            >Démarrer une discussion</v-btn
          >
        </v-list-item>
    
        <v-list-item v-if="showDropdown">
          <v-virtual-scroll :height="500" :items="intervenants">
            <template v-slot:default="{ item }">
              <div @click="addUserInSelectedGroupeUser(item)" :class="{'selectedUser' : selectedUsersForDiscussion.includes( item )}" class="py-2 px-2 intervenants" style="display:flex; align-items: center;">
                <v-avatar
                  style="margin-right:5px"
                  :image="`${
                    item?.avatar
                      ? item.avatar
                      : '/public/user-placeholder.png'
                  }`"
                ></v-avatar>
                <p> <span style="font-weight: 500">{{ item.profile_id }}</span> : {{ item.username }}</p>               
              </div>
              <hr>
            </template>
          </v-virtual-scroll>
          <p v-if="noSelectedUsers" class="py-2" style="color:red; font-weight:500">Veuillez seelctionner un ou plusieurs utilisateurs pour démarrer une discussion</p>
          <v-btn @click="startConversation" style="display:block;margin: 10px auto" color="success">Demarrer</v-btn>
        </v-list-item>

      </v-list>
    </div>
    <Tchat style="width: 75%" />
  </div>
</template>

<script lang="ts" setup>
import Tchat from "@/components/Tchat.vue";
import UserInterface from "@/interfaces/userInterface"
import { SalonInterface } from "@/interfaces/salonInterface";
import { ref, Ref, reactive } from "vue";
import { useMessageStore } from "@/store/messageStore";
import { useUserStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import router from "@/router";

interface ProfileName {
  name: string;
}

const userStore = useUserStore();
const messageStore = useMessageStore();

const selectedDiscussion: Ref<string | null> = ref(null);
const showDropdown: Ref<boolean> = ref(false);
const { user } = storeToRefs(userStore);
const profileName: Ref<ProfileName | null> = ref(null);



if (user.value) {
  profileName.value = await userStore.getUserProfileNameById(
    user.value.profile_id
  );
} else {
  alert(
    "Votre compte utilisateur n'a pas de profile, merci de contacter l'admin"
  );
  await userStore.logout();
  router.push("/");
}

const discussions: SalonInterface[] = reactive([]);
const selectedUsersForDiscussion: UserInterface[] = reactive([])
const noSelectedUsers: Ref<boolean> = ref(false);
const intervenants = await userStore.getContributorUsers();

//recupere le nom du profile de l'utilisateur connecté
if (user.value?.profile_id) {
  profileName.value = await userStore.getUserProfileNameById(
    user.value?.profile_id
  );
}
// recupere les salon active de l'utilisateur
if (user.value?.id) {
  messageStore.fetchSalon(user.value.id);
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// s'execute lordque l'on selectionne un utilisateur dans la liste
const startConversation = () => {
  if (selectedUsersForDiscussion.length === 0) {
    noSelectedUsers.value = true
  } else {
    noSelectedUsers.value = false
  }
  
}


const addUserInSelectedGroupeUser = (user: UserInterface) => {
  const isUserAlreadyInArray = selectedUsersForDiscussion.findIndex(el => el.id === user.id)
  if (isUserAlreadyInArray === -1) {
    selectedUsersForDiscussion.push(user)
  } else {
    selectedUsersForDiscussion.splice(isUserAlreadyInArray , 1)
  }
}
</script>

<style scoped>
.aside {
  width: 25%;
  max-width: 400px;
  height: 100%;
  background: #fff;
  border-right: 1px solid #c7c6c6;
  transition: all 0.3s;
}
.noDiscussionSelected {
  width: 100%;
  max-width: 100%;
  position: absolute;
  z-index: 1;
}
.intervenants:hover{
  background: rgb(179, 224, 179);
  cursor:pointer;
  color:rgb(102, 101, 101)
}
.selectedUser{
  background-color:rgb(150, 223, 213);
}

</style>
