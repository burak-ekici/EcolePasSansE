<template>
  <div class="newsPageContainer pa-10">
    <div class="subContainer">
      <h2 class="text-center mb-8 block">Nouveautés</h2>
      <Caroussel :posts="posts" />
      <section class="posts">
        <div v-for="post in posts" :key="post.title">
          <h3>{{ post.title }}</h3>
          <img :src="post.src" alt="">
          <p>{{post.description}}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Caroussel from '@/components/Caroussel.vue'

import { reactive } from 'vue';


const posts = reactive([
  {
    src:"https://picsum.photos/1300/1080",
    title: 'premier titre',
    description : 'premiere description Just add your desired image size after our URL, and youll get a random image.'
  },
  {
    src:"https://picsum.photos/1300/1080",
    title: 'deuxieme titre',
    description : 'deuxieme description Just add your desired image image.'
  },
  {
    src:"https://picsum.photos/1300/1080",
    title: 'troisieme titre',
    description : 'troisieme description after our URL, and youll get a random image.'
  },
  {
    src:"https://picsum.photos/1300/1080",
    title: 'quatrieme titre',
    description : 'quatrieme description Just add your desired image after our URL, and youll get a random image.'
  }

])
</script>

<style scoped>
.newsPageContainer{
  width:80vw;
  margin:0 auto;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width:1000px;
}
.subContainer{
  width:100%;
}

.posts h3{
  display:block;
  text-align: left;
  margin-top:20px;
}
.posts img{
  width:300px;
  height:200px;
}
</style>
