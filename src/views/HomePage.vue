<template>
  <div v-if="posts.length" class="newsPageContainer pa-10">
    <div class="subContainer">
      <h2 class="text-center mb-8 block">News</h2>
      <Caroussel :posts="posts" />
      <section class="posts">
        <v-card class="mt-6 pb-6" style="position:relative"  v-for="(post, index) in posts" :key="post.title">
          <v-toolbar color="#176B87" border class="text-white">
            <v-toolbar-title >{{ post.title }}</v-toolbar-title>
          </v-toolbar>
          <div class="pa-6">
            <img :class="{'float-right' : index % 2 , 'float-left' : !(index % 2) }" :src="post.src" alt="">
            <p>{{post.description}}</p>
          </div>
          <div class="btnDiv pr-6 pt-4">
            <v-btn elevation="0" :to="`/post/${post.id}`" color="#64CCC5" class="btnInfo text-white">En savoir plus</v-btn>
          </div>
        </v-card>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Caroussel from '@/components/Caroussel.vue'
import { usePostsStore } from '@/store/PostsStore';
import { storeToRefs } from 'pinia'

const postsStore = usePostsStore()
postsStore.$reset()
postsStore.getPosts()

const { posts } = storeToRefs(postsStore)

</script>

<style scoped>
.newsPageContainer{
  width:80vw;
  margin:0 auto;
  height:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
  max-width:1200px;
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

.float-right{
  float: right;
  margin-left: 15px;
}
.float-left{
  float: left;
  margin-right: 15px;
}
.btnDiv{
  display:flex;
  width:100%;
  justify-content: right;
}
</style>
