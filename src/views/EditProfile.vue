<template>
  <div class="profilePageContainer pa-8">
    <h2 class="text-center">Modifier le profile</h2>
    <div class="profileContainer mt-8" style="width: 70%; margin: 0 auto">
      <v-btn @click="goToProfilePage" class="btnBack text-white"  icon="mdi-arrow-u-left-bottom-bold" size="large"></v-btn>
      <section class="leftSection text-center" style="width: 100%">
        <v-card class="w-100" style="position:relative">
          <v-card-title class="cardTitle mb-8"> {{ user.username }} </v-card-title>
          <label for="avatar" class="avatarLabel">
            <img
              v-if="formData.avatar"
              :src="formData.avatar"
              :alt="`profile picture`"
              class="avatar"
            />
            <img
              v-else
              src="/user-placeholder.png"
              :alt="`profile picture`"
              class="DefaultAvatar" />

            <div class="cameraAndSpinnderContainer">
              <Spinner v-if="avatarLoading" color="white" />
              <v-icon v-else  class="icon" color="white" >mdi-camera</v-icon>
            </div>

            <input
              class="inputAvatar"
              style="width:100%"
              v-show="false"
              type="file"
              id="avatar"
              accept="image/*"
              @change="handleAvatarUpload"
            />
          </label>

          <v-form class="form" ref="form" @submit.prevent="update">
            <v-text-field active v-model="formData.email" label="Email" variant="outlined"></v-text-field>
            <v-text-field active v-model="formData.username" label="Pseudonyme" variant="outlined"></v-text-field>
            <v-text-field active v-model="formData.firstname" label="Prenom" variant="outlined"></v-text-field>
            <v-text-field active v-model="formData.lastname" label="Nom" variant="outlined"></v-text-field>
            <v-combobox
              label="Profile"
              :items="profileList.value"
              v-model="formData.profile"
            ></v-combobox>
            <v-text-field active v-model="formData.adress" label="Adresse" variant="outlined"></v-text-field>
            <v-text-field active v-model="formData.zip_code" label="Code postal" variant="outlined"></v-text-field>
            <v-text-field active v-model="formData.city" label="Ville" variant="outlined"></v-text-field>

            <div class="btnContainer">
              <v-btn
                color="success"
                class="mt-4"
                type="submit"
              >
                Validate
              </v-btn>

              <v-btn
                color="error"
                class="mt-4"
                
              >
                Reset Form
              </v-btn>
            </div>

          </v-form>
        </v-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from '@/components/UI_Element/Spinner.vue';
import { ref, Ref, computed, onMounted, reactive} from 'vue';
import { useUserStore } from '@/store/userStore';
import { useProfileStore } from '@/store/profileStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import User from '@/interfaces/userInterface'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const avatarLoading: Ref<boolean> = ref(false)
const profileStore = useProfileStore();
const avatarImg : Ref<any> = ref(null)
const { profiles, profile } = storeToRefs(profileStore);
let formData = reactive<User>({
  email: '',
  username: '',
  avatar: '',
  firstname: '',
  lastname: '',
  profile_id: '',
  adress: '',
  zip_code: '',
  city : ''
})
const profileList = computed(() => {
  return profiles || []
})

onMounted(async () => {
  // on initialise les profiles dans le store qui est lui même connecté 
  // à la variable profileList par un computed
  await profileStore.fetchProfiles()
  // on recupere le nom du profile de l'utilisateur pour le prechoisir dans l'input profile
  if (user.value.profile_id) {
    await profileStore.fetchProfileNameById(user.value.profile_id)
  }
  if (user.value.avatar) {
    avatarImg.value = user.value.avatar
  }
  formData.email = user.value.email
  formData.username = user.value.username
  formData.avatar = user.value.avatar
  formData.firstname = user.value.firstname
  formData.lastname = user.value.lastname
  formData.profile = profile.value
  formData.adress = user.value.adress
  formData.zip_code = user.value.zip_code
  formData.city = user.value.city

})

async function handleAvatarUpload(e) {
  avatarLoading.value = true;
  avatarImg.value = e.target.files[0];
  if (avatarImg.value && avatarImg.value.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.readAsDataURL(avatarImg.value);
    reader.onload = function (e) {
      if (e.target?.result) {
        formData.avatar = e.target.result.toString(); // variable à stocké dans la bdd
      }
      avatarLoading.value = false
    }
    reader.onerror = function (error) {
      console.log(error) // Rejette la promesse en cas d'erreur
    };
  }
    return 
}


const goToProfilePage = (): void =>{
  router.push('/profile')
}

async function update() {
  // const profile_id = await profileStore.fetchProfileIdByName(formData.profile)
  const avatar_url = await userStore.uploadAvatarImage(avatarImg.value, user.value.id)
  console.log(avatar_url)
  // return await userStore.updateUser({
  //   username: formData.username,
  //   firstname: formData.firstname,
  //   lastname: formData.lastname,
  //   email: formData.email,
  //   profile_id: profile_id,
  //   adress: formData.adress,
  //   zip_code: formData.zip_code,
  //   city : formData.city
  // })
}

</script>

<style scoped lang="scss">
@import "@/styles/settings.scss";

.cardTitle {
  background-color: $secondary-color;
  color: white;
}
.form{
  width:100%;
  margin:0 auto;
  padding: 0 3rem
}
.avatarLabel{
  position: relative;
  width:200px;
  height : 200px;
  display:block;
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  margin-bottom: 50px;
  overflow: hidden
}
.btnContainer{
  width:30%;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.profileImage {
  border-radius: 50%;
  margin: 0 auto;
}


.icon {
  cursor: pointer;
  transform: scale(1.5);
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.5s;
  border-radius: 50%;
}
.icon:hover {
  transform: scale(2);
}
.cameraAndSpinnderContainer{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
}

.avatar{
  width: 400px; /* Force l'image à remplir toute la largeur du conteneur */
  height: auto; /* Maintient le rapport hauteur-largeur de l'image */
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
.DefaultAvatar{
  width: 100%; /* Force l'image à remplir toute la largeur du conteneur */
  height: auto; /* Maintient le rapport hauteur-largeur de l'image */
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
.cameraIcon{
  width:100%;
} 

.btnBack{
  display: block;
  width:50px;
  height:50px;
  position : absolute;
  top : 2%;
  left: 19%;
  background-color: $secondary-color;
}
</style>
