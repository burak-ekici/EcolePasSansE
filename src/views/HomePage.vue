<template>
  <div v-if="posts.length" class="newsPageContainer pa-10">
    <div class="subContainer">
      <h2 class="text-center mb-8 block">News</h2>
      <Caroussel :posts="posts" />
      <section v-if="posts.length" class="posts">
        <v-card class="mt-6 pb-6" style="position:relative"  v-for="(post, index) in postsToShow" :key="post.title">
          <v-toolbar color="#176B87" border class="text-white pr-3">
            <v-toolbar-title >{{ post.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <p>publié le {{ getformatedDate(post.publish_date) + ' à ' +  getHourFromDate(post.publish_date)}}</p>
          </v-toolbar>
          <div class="pa-6">
            <img :class="{'float-right' : index % 2 , 'float-left' : !(index % 2) }" :src="post.src" alt="">
            <p>{{ raccourcirLeText(post.description,50) }} ...</p>
          </div>
          <div class="btnDiv pr-6 pt-4">
            <v-btn elevation="0" :to="`/post/${post.id}`" color="#64CCC5" class="btnInfo text-white">En savoir plus</v-btn>
          </div>
        </v-card>
      </section>
      <div v-intersect="loadMorePosts"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Caroussel from '@/components/Caroussel.vue'
import { usePostsStore } from '@/store/PostsStore';
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

const postsStore = usePostsStore()
// recupere les posts via le store
const { posts } = storeToRefs(postsStore)

const postsToShow = ref(posts.value.slice(0,5))

function loadMorePosts() {
  const startIndex = postsToShow.value.length
  const arrayToPush = posts.value.slice(startIndex, startIndex +5)
  arrayToPush.forEach(el => {
    postsToShow.value.push(el)
  })
}

function raccourcirLeText(text: string, longueurMax: number) :string {
  return text.split(' ').slice(0,longueurMax).join(' ')
}

function getformatedDate(dateToModify: string) : string {
  const date = dateToModify.split(' ')[0]
  return date.split('-').join('/')
}

function getHourFromDate(dateToModify : string) : string {
  return dateToModify.split(' ')[1].slice(0,5)
}

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

*{
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;
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
