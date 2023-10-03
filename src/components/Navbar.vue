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
        v-if="isUserConnected"
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        style="flex-grow: 0"
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
        style="flex-grow: 0; cursor:pointer"
        @click="redirectToLoginPage()"
      ></v-list-item>
    
    
      
  

    <v-divider></v-divider>
    <!-- Changer d'utilisateur -->
    <v-list density="compact" nav>
      <v-list-item
        v-if="isUserConnected"
        @click="navigateTo('/switchUser')"
        :active="isActive('/switchUser')"
        prepend-icon="mdi-swap-horizontal"
        title="Changer d'utilisateur"
        value="switchUser"
      ></v-list-item>
    </v-list>

    <!-- Menu navbar -->
    <v-list density="compact" style="top: 50%; transform: translateY(-50%)" nav>
      <v-list-item
        @click="navigateTo('/')"
        :active="isActive('/')"
        prepend-icon="mdi-home"
        title="Acceuil"
        value="acceuil"
      ></v-list-item>
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
        title="File"
        value="file"
      ></v-list-item>
      <v-list-item
        @click="navigateTo('/activites')"
        :active="isActive('/activites')"
        prepend-icon="mdi-ticket"
        title="Activités"
        value="activités"
      ></v-list-item>
      <v-list-item
        @click="navigateTo('/calendar')"
        :active="isActive('/calendar')"
        prepend-icon="mdi-calendar-month"
        title="Calendrier"
        value="calendrier"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list-item
        prepend-icon="mdi-logout"
        title="Deconnexion"
        value="deconnexion"
        class="mb-4 logoutbutton"
      ></v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import router from "@/router";
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const { isUserConnected } = storeToRefs(userStore)

const drawer: Ref<boolean> = ref(true);
const rail: Ref<boolean> = ref(true);

function navigateTo(pageName: string): void {
  rail.value = true;
  router.push(pageName);
}

function redirectToLoginPage() :void{
  if (router.currentRoute.value.fullPath !== '/login') {
    router.push('/login')
  }
}

function isActive(routePath: string): boolean {
  return router.currentRoute.value.path === routePath;
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
</style>
