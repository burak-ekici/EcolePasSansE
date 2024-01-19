<template>
  <div class="container">
    <div class="subContainer">
      <h1 class="text-center mb-16">Editer un post</h1>

      <div class="actualImageContainer">
        <p class="font-weight-medium">Image Actuel :</p>
        <v-img
          :width="300"
          aspect-ratio="16/9"
          cover
          class="mb-12 ml-16"
          :src="`${image_src}`"
        ></v-img>
      </div>
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
          label="Selectionner une nouvelle image"
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
          >Modifier</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "@/store/PostsStore";
import { onMounted, ref, Ref, toRef } from "vue";
import router from "@/router";
import { PostsInterface } from "@/interfaces/postInterface";
import { storeToRefs } from "pinia";
import useNotifications from "@/composables/useNotifications";
import { useUserStore } from "@/store/userStore";

const { user } = storeToRefs(useUserStore());

const { addNotification } = useNotifications();

const props = defineProps(["id"]);
const postId: number = toRef(props.id);

const postsStore = usePostsStore();
const { getPost } = storeToRefs(postsStore);

const isloading: Ref<boolean> = ref(false);
const title: Ref<string> = ref("");
const short: Ref<string> = ref("");
const description: Ref<string> = ref("");
const image_file: Ref<File | null> = ref(null);
const image_alt: Ref<string> = ref("");
const image_src: Ref<string> = ref("");

onMounted(() => {
  const post = getPost.value(postId.value);
  if (!post) {
    addNotification({
      message: "Le post n'existe pas",
      type: "error",
    });
    router.push("/admin/posts");
  } else {
    title.value = post.title;
    short.value = post.short;
    description.value = post.description;
    image_alt.value = post.image_alt;
    image_src.value = post.image_src;
  }
});

function handleImage(e: any) {
  image_file.value = e.target.files[0];
}

async function addPost() {
  isloading.value = true;
  let url = "";
  if (image_file.value !== null) {
    url = (await postsStore.storePostImage(image_file.value, title.value)) || "";
  }

  const currentTimestamp = new Date().getTime();

  const response = await postsStore.updatePost({
    id: postId.value,
    author : String(user.value?.id),
    title: title.value,
    short: short.value,
    modified_at: new Date(currentTimestamp),
    description: description.value,
    image_src: url ? url : image_src.value,
    image_alt: image_alt.value,
  } as PostsInterface);

  isloading.value = false;
  if (response) {
    console.log("Redirection vers /admin/posts");
    router.push("/admin/posts");
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 3rem 6rem;
  min-height: 100vh;
  overflow: hidden;
}

.actualImageContainer{
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;
}
</style>
