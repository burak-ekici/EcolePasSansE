<template>
  <div class="container">

    <section class="navbar">
      <KidsNavbar />
    </section>

    <section class="contenue">
      <slot></slot>
    </section>

  </div>
</template>

<script lang="ts" setup>
import KidsNavbar from '@/components/KidsNavbar.vue';
</script>

<style scoped>
.container{
  width: 100vw;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
}

.navbar{
  position:relative;
  left: 0%;
  height: 100%;
  width: 100px;
  background: gray;
  color:white;
  height : 100vh;
}
.contenue{
  display: block;
  flex-basis: fill;
  background: rgb(37, 139, 117);
  height : 100vh;
  width:100%;
}

</style>