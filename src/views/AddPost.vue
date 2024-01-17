<template>
  <div class="container">
    <div class="subContainer">
      <h1 class="text-center">Ajouter un post</h1>
      <v-form>
        <v-text-field
          v-model="title"
          label="Titre"
          required
        ></v-text-field>
        <v-text-field
          v-model="short"
          label="short"
          required
        ></v-text-field>
        <v-textarea
          v-model="description"
          label="Description"
          required
        ></v-textarea>
        <v-file-input
          label="Image"
          accept="image/*"
          prepend-icon="mdi-camera"
          placeholder="Choisissez une image"
          outlined
          @change="handleImage"
          required
        ></v-file-input>
        <v-text-field
          v-model="image_alt"
          label="Image description"
          placeholder="Choisissez une image"
          outlined
          required
        ></v-text-field>
        <v-btn
          :active="true"
          :loading="false"
          color="success"
          class="text-white"
          @click="addPost"
        >Ajouter</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { usePostsStore } from "@/store/PostsStore";
import { ref } from "vue";
import router from "@/router";
import { PostsInterface } from "@/interfaces/postInterface";

const postsStore = usePostsStore();

const title = ref("");
const short = ref("");
const description = ref("");
const image_file = ref(null);
const image_alt = ref("");

function handleImage(e: any) {
  image_file.value = e.target.files[0];
}

async function addPost() {
  if (image_file.value === null) {
    return;
  }
  const url: string = await postsStore.storePostImage(image_file.value, title.value) || "";

  const response = await postsStore.createPost({
    title: title.value,
    short: short.value,
    description: description.value,
    image_src: url,
    image_alt: image_alt.value,
  } as PostsInterface);
  console.log(response)
  if (response) {
    console.log('Redirection vers /admin/posts');
    router.push('/admin/posts');
  }
  
}
</script>

<style lang="scss" scoped>
.container{
  padding:3rem 6rem;
}
</style>