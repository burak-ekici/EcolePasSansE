<template>
  <v-container color="#fff">
    <div class="tchatContainer">
      <div class="messagesListDiv">
      <!-- Align-self: flex-end pour placer le message à droite, Charger les message du plus recent au plus ancien -->
        <div
          style="
            height: auto;
            white-space: normal;
            display: flex;
            flex-flow: column wrap;
            width: fit-content;
            background: #0b003d;
            border-radius: 5px;
            align-self: flex-end;
          "
          
          class="px-4 py-2 mb-2 text-white loggedUserMessage"
        >
          <p class="ml-2" style="font-size: 0.5rem">le 09/11 à 09h36</p>
          <p>{{ "Super et toi ?" }}</p>
        </div>

        <div
          style="
            height: auto;
            white-space: normal;
            display: flex;
            flex-flow: column wrap;
            width: fit-content;
            background: #0b003d;
            border-radius: 5px;
          "
          class="px-4 py-2 mb-2 text-white"
        >
          <p class="ml-2" style="font-size: 0.5rem">le 09/11 à 09h34</p>
          <p>{{ "salut cava ?" }}</p>
        </div>
      </div>

      <!-------------------------------------- Message input area  -->
      <div class="inputDiv">
        <v-text-field
          placeholder="message"
          type="text"
          no-details
          outlined
          bg-color="#fff"
          hide-details
        >
          <template v-slot:append-inner>
            <div>
              <v-icon class="sendIcon" icon="mdi-send"></v-icon>
            </div>
          </template>

          <template v-slot:prepend>
            <div>
              <v-tooltip activator="parent" location="top"
                >Lancer l'enregistrement video</v-tooltip
              >
              <v-icon size="large" class="iconVideo" icon="mdi-video"></v-icon>
            </div>
            <div class="ml-2" style="transform: rotate(45deg)">
              <v-tooltip activator="parent" location="top"
                >Joindre un fichier</v-tooltip
              >
              <v-icon
                size="large"
                class="iconPaperclip"
                icon="mdi-paperclip"
              ></v-icon>
            </div>
          </template>
        </v-text-field>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
const props: any = defineProps(["messages"]);
const { messages } = toRef(props.messages);
console.log(messages);
</script>

<style scoped lang="scss">
.tchatContainer {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .messagesListDiv {
    height: 90%;
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 20px;
  }

  .inputDiv {
    height: 10%;
  }
}
.loggedUserMessage {
  background-color: #15942b !important;
}

.sendIcon {
  cursor: pointer;
  color: rgb(63, 90, 209);
}
.sendIcon:hover {
  color: rgb(27, 50, 150);
}
.iconPaperclip,
.iconVideo {
  cursor: pointer;
}
.iconPaperclip:hover,
.iconVideo:hover {
  color: rgb(83, 83, 83);
}
</style>
