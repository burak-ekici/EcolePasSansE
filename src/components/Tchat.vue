
<template>
  <v-container color="#fff">
    <div class="test">
    <v-text-field class="tchatInput" color="#fff" bg-color="#fff"></v-text-field>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import {toRef, watch} from 'vue'
const props: any = defineProps(['messages'])
const { messages } = toRef(props.messages)
console.log(messages)
watch(messages, () => {
  console.log(messages.value)
})
</script>

<style scoped>
.test{
  width:100%;
  height:100vh;
  display:block;
  position: relative;
}
.tchatInput{
  position:relative;
  bottom:-90%;

}
</style>