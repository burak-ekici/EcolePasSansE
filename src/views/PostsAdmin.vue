<template>
  <div class="container">
    <section class="titleAndAddBtn d-flex pr-16">
      <h1 class="mb-8">Liste des News</h1>
      <v-spacer></v-spacer>
      <v-btn @click="navigateToAddPost" rounded color="success" icon="mdi-plus" density="comfortable"></v-btn>
    </section>
    <v-row>
      <v-col v-for="post in getPosts" :key="post.id" cols="12" sm="6" xl="3">
        <v-sheet border >
          <v-img
            style="cursor: pointer"
            @click="goToPostPage(post.id)"
            :src="post.image_src"
            cover
            height="250"
          ></v-img>

          <v-list-item
            lines="two"
            density="comfortable"
            :subtitle="post.short"
          >
            <template v-slot:title>
              <strong class="text-h6">
                {{ post.title }}
              </strong>
            </template>

            <v-divider class="my-2"></v-divider>

            <section class="btnSection d-flex">
              <v-btn @click.prevent="navigateToEditPost(post.id)" :active="true" :loading="false" color="success" class="text-white">Modifier</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="deletePost(post.id)" :active="true" :loading="false" color="red-darken-1" class="text-white">Supprimer</v-btn>
            </section>
          </v-list-item>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "@/store/PostsStore";
import { storeToRefs } from "pinia";
import router from "@/router";

const postsStore = usePostsStore();
const { getPosts } = storeToRefs(postsStore);

await postsStore.fetchPosts();

function navigateToAddPost() {
  router.push({ name: "newPost" });
}
function goToPostPage(id: number) {
  router.push(`/post/${id}`);
}
function navigateToEditPost(id: number) {
  router.push({ name: "editPost", params: { id } });
}
async function deletePost(id: number) {
  const response : boolean = confirm('Voulez vous vraiment supprimer ce post ?')
  if (!response) return;
  await postsStore.deletePost(id);
}
</script>

<style lang="scss" scoped>
.container {
  padding: 3rem 6rem;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
