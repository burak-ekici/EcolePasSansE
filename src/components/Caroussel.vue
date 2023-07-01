<template>
  <v-carousel
    cycle
    height="500"
    hide-delimiter-background
    show-arrows
    interval="5000"
  >
    <v-carousel-item
      v-for="post in carouselItems"
      :key="post.title"
      cover
      :src="post.src"
      
    >
    <v-toolbar color="#001C30">
      <v-toolbar-title class="text-center text-white text-button font-weight-medium">{{post.title}}</v-toolbar-title>
    </v-toolbar>
      <div class="carouselItemContent">
        <h3></h3>
        <p>{{post.description}}</p>
        <v-btn :to="`/post/${post.id}`" color="#64CCC5" class="mt-6 text-white">En savoir plus</v-btn>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['posts']);


const carouselItems = computed(() => {
  return props.posts.slice(0,3)
})

</script>

<style scoped>
.carouselItemContent{
  position:absolute;
  top:60%;
  left:50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
h3{
  color:white;
}
p{
  color:white;
}
</style>