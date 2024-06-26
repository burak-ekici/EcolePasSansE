<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    class="text-white drawer d-flex flex-column justify-space-between"
    ref="navbarDrawer"
    @mouseenter="rail = false"
    @mouseleave="rail = true"
  >
      <!-- icone quand le user est connecté -->
      <v-list-item
        v-if="user"
        :prepend-avatar="avatar"
        :title="username"
        style="flex-grow: 0"
        @click="redirectToProfilePage"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <!-- Quand le user n'est pas connecté  -->
      <v-list-item
        v-else
        prepend-icon="mdi-account"
        title="Se connecter"
        class="ButtonSeConnecter"
        style="flex-grow: 0; cursor:pointer"
        @click="redirectToLoginPage()"
      ></v-list-item>
    

    <v-divider></v-divider>


    <!-- Menu navbar -->
    <v-list density="compact" style="top: 42%; transform: translateY(-50%)" nav>
      <v-list-item
        @click="navigateTo('/')"
        :active="isActive('/')"
        prepend-icon="mdi-home"
        title="Acceuil"
        value="acceuil"
      ></v-list-item>
      <template v-if="user">

        <v-list-item
          @click="navigateTo('/messagerie')"
          :active="isActive('/messagerie')"
          prepend-icon="mdi-forum"
          title="Messagerie"
          value="messagerie"
        ></v-list-item>

        <v-list-item
          @click="navigateTo('/files')"
          :active="isActive('/files')"
          prepend-icon="mdi-file"
          title="Fichier"
          value="file"
        ></v-list-item>

        <v-list-item
          @click="navigateTo('/calendar')"
          :active="isActive('/calendar')"
          prepend-icon="mdi-calendar-month"
          title="Calendrier"
          value="calendrier"
        ></v-list-item>

      </template>
    </v-list>

    <template v-if="user" v-slot:append>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Deconnexion"
        value="deconnexion"
        class="mb-4 logoutbutton"
        @click="logout"
      ></v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import router from "@/router";
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const drawer: Ref<boolean> = ref(true);
const rail: Ref<boolean> = ref(true);

const avatar = computed((): string => {
  if (typeof user.value.avatar === 'string' && user.value.avatar) {
    return user.value.avatar
  }
  else {
    return '/user-placeholder.png'
  }
})
const username = computed(() : string => {
  if (typeof user.value.username === 'string' && user.value.username) {
    return user.value.username
  } else {
    return 'Pseudonyme'
  }
})


function navigateTo(pageName: string): void {
  rail.value = true;
  router.push(pageName);
}

function redirectToLoginPage() :void{
  router.push('/login')
}

function redirectToProfilePage() {
  router.push('/user/profile')
}

function isActive(routePath: string): boolean {
  return router.currentRoute.value.path === routePath;
}

async function logout() {
  const response: boolean = await userStore.logout();
  user.value = null;
  if (response === true) {
    console.log('deconnexion reussie')
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings.scss";

.logoutbutton {
  cursor: pointer;
}
.drawer {
  background-color: $primary-color !important;
}
.logoutbutton:hover {
  background: $secondary-color;
}

.ButtonSeConnecter:hover{
  background:$secondary-color;
}
*{
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
}
</style>
