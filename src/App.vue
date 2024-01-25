<template>
  <v-app>
    <!-- ce component charge le layout ( default ou kids) qui contient la navbar et un slot default -->
    <Suspense>
      <component :key="layout" :is="layout ||'div'"> 
          <router-view :key="`${$route.path}${JSON.stringify($route.query)}`" /> <!-- le router-view prendra la place du slot dans le layout -->
      </component>
    </Suspense>
    <AppNotifications />
  </v-app>
</template>

<script lang="ts" setup>
import { watch, shallowRef, ShallowRef, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import layouts from "@/layouts/layouts";
import { useGlobalStore } from '@/store/globalStore';
import { useUserStore } from '@/store/userStore';
import AppNotifications from '@/components/Notifications.vue'

const globalStore = useGlobalStore()
const { layoutName } = storeToRefs(globalStore)
const userStore = useUserStore()

onMounted(async () => {
  await userStore.seeCurrentUser()
})

//shalowRef se comporte presque comme ref sauf que nous chargons ici un component,
//shalowRef permet de regarder la surface seulement pour gagner en performance
//car un component à beaucoup de valeur. inutile de suivre toutes ces valeurs, ca ferait perdre
//en performance
const layout : ShallowRef<any> = shallowRef(layouts[layoutName.value]);

watch(layoutName, () => {
  layout.value = layouts[layoutName.value];
});

// creer les posts dans le state
// const postsStore = usePostsStore()
// postsStore.getPosts()

</script>

<style>
*{
  -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Standard */
}
</style>
