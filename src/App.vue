<template>
  <v-app>
    <!-- ce component charge le layout ( default ou kids) qui contient la narvbar et un slot default -->
    <component :key="layout" :is="layout ||'div'"> 
        <router-view :key="`${$route.path}${JSON.stringify($route.query)}`" /> <!-- le router-view prendra la place du slot dans le layout -->
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import { watch, shallowRef, ShallowRef } from 'vue';
import { storeToRefs } from 'pinia'
import layouts from "@/layouts/layouts";
import { useGlobalStore } from '@/store/globalStore';

const globalStore = useGlobalStore()

const { layoutName } = storeToRefs(globalStore)

//shalowRef se comporte presque comme ref sauf que nous chargons ici un component,
//shalowRef permet de regarder la surface seulement pour gagner en performance
//car un component à beaucoup de valeur. inutile de suivre toutes ces valeurs, ca ferait perdre
//en performance
const layout : ShallowRef<any> = shallowRef(layouts[layoutName.value]);

watch(layoutName, () => {
  layout.value = layouts[layoutName.value];
});


</script>
