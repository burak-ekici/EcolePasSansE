<template>
  <div class="container">
    <div class="subContainer">
      <h1 class="text-center mb-16">Ajouter un post</h1>
      <v-form>
        <v-text-field
          class="mb-4"
          v-model="title"
          label="Titre"
          required
          variant="outlined"
        ></v-text-field>
        <v-text-field
        class="mb-4"
          v-model="short"
          label="short"
          required
          variant="outlined"
        ></v-text-field>
        <v-textarea
        class="mb-4"
          v-model="description"
          label="Contenu"
          required
          variant="outlined"
        ></v-textarea>
        <v-file-input
        class="mb-4"
          label="Selectionner une image"
          accept="image/*"
          prepend-icon="mdi-camera"
          placeholder="Choisissez une image"
          variant="outlined"
          @change="handleImage"
          required
        ></v-file-input>
        <v-text-field
          class="mb-4"
          v-model="image_alt"
          label="Description de l'image"
          placeholder="Choisissez une image"
          outlined
          required
          variant="outlined"
        ></v-text-field>
        <v-btn
          :active="!isloading"
          :loading="isloading"
          color="success"
          class="text-white"
          @click="addPost"
          block
        >Ajouter</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { usePostsStore } from "@/store/PostsStore";
import { ref , Ref } from "vue";
import router from "@/router";
import { PostsInterface } from "@/interfaces/postInterface";

const postsStore = usePostsStore();

const isloading : Ref<boolean> = ref(false);
const title : Ref<string> = ref("");
const short : Ref<string> = ref("");
const description : Ref<string> = ref("");
const image_file : Ref<File | null> = ref(null);
const image_alt : Ref<string> = ref("");

function handleImage(e: any) {
  image_file.value = e.target.files[0];
}

async function addPost() {
  isloading.value = true;
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

  isloading.value = false;
  if (response) {
    console.log('Redirection vers /admin/posts');
    router.push('/admin/posts');
  }
  
}
</script>

<style lang="scss" scoped>
.container{
  padding:3rem 6rem;
  min-height: 100vh;
  overflow: hidden;
}
</style>