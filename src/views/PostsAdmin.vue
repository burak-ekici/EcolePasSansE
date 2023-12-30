<template>
  <div>
    <h1>Posts Admin</h1>
    <div v-for="post in getPosts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.short }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from '@/store/PostsStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const postsStore = usePostsStore();

const { getPosts } = storeToRefs(postsStore);

async function fetchPosts() {
  return await postsStore.fetchPosts();
}
const a = ref('')

onMounted(async () => {
  a.value = await fetchPosts();
  console.log(a.value)
});

</script>