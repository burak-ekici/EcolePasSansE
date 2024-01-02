<template>
  <!-- Les posts sont accessible sur la HomePage -->
  <v-container>
    <h2 class="text-center mt-4 mb-16 text-uppercase">{{ getPost(postId)?.title }}</h2>
    <img v-if="getPost(postId)?.image_src" class="mainImg rounded" :src="getPost(postId)?.image_src" :alt="getPost(postId)?.image_alt">
    <p>{{ getPost(postId)?.description }}</p> 
  </v-container>
</template>

<script lang="ts" setup>
import { usePostsStore } from '@/store/PostsStore';
import { storeToRefs } from 'pinia'
import { toRef } from 'vue';

// on recupere le props id via le router, il definie le param de /post/:id
const props = defineProps(['id'])
const postId : number = toRef(props.id)

// on recupere les posts 
const postsStore = usePostsStore()

//getPost est un getter, comme le computed, il ne peux pas avoir de parametre, donc je retourne une
//fonction, 
const { getPost } = storeToRefs(postsStore)
</script>

<style scoped>
.mainImg{
  width : 400px;
  height:300px;
  float : right;
  margin-left : 2rem;
  margin-bottom: 1 rem;
}
</style>