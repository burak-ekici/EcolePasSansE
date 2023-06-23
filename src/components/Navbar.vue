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
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
      nav
      style="flex-grow :0"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list 
    density="compact" 
    class="text-white"
    style="top:50%; transform: translateY(-50%)"
    nav
    >
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

const drawer: Ref<boolean> = ref(true);
const rail: Ref<boolean> = ref(true);

function navigateTo(pageName: string): void {
  rail.value = true
  router.push(pageName)
}
function isActive(routePath : string) : boolean {
  return router.currentRoute.value.path === routePath;
}
</script>

<style scoped lang="scss">
@import '../styles/settings.scss';

.logoutbutton{
  cursor:pointer;
}
.drawer{
  background-color: $primary-color !important;
}
.logoutbutton:hover{
  background: $secondary-color;
}
</style>
