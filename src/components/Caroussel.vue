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
      :alt="post.image_alt"
      cover
      :src="post.image_src"

    >
    <v-toolbar color="#001C30">
      <v-toolbar-title class="text-center text-white text-button font-weight-bold">{{post.title}}</v-toolbar-title>
    </v-toolbar>

      <div class="carouselItemContent">
        <p class="font-weight-bold" style="text-shadow: 2px 1px 3px #000;">{{post.short}}</p>
        <v-btn :to="`/post/${post.id}`" color="#64CCC5" class="mt-6 text-white ">En savoir plus</v-btn>
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