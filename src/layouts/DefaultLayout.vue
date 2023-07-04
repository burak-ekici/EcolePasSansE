<template>
  <div class="container">

    <section class="navbar">
      <Navbar />
    </section>

    <section class="contenue">
      <slot></slot>
    </section>

  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
.container{
  width: 100vw;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
}

.contenue{
  display: block;
  height : 100%;
  width:100%;
  padding-left:55px;
  position: relative;
}

</style>