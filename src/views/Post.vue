<template>
  <div>
    Post {{ postId }}
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const postId = router.currentRoute.value.params.id; // router est reactive
</script>