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
              :src="'/user-placeholder.png'"
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
          <!-- fast fail arrete la validation de l'errur des la premiere rules qui echoue et n'attend pas la suite  -->
          <v-form :disabled="isFormLoading" fast-fail class="form" ref="form" @submit.prevent="update">
            <v-text-field :rules="[rules.required, rules.isValidEmail]" active v-model="formData.email" label="Email*" variant="outlined" type="email"></v-text-field>
            <v-text-field :rules="[rules.required,rules.maxLength(25), rules.minLength(3)]" validate-on="blur" active v-model="formData.username" label="Pseudonyme*" variant="outlined"></v-text-field>
            <v-text-field :rules="[rules.emptyOrMinLength(3), rules.maxLength(25)]" validate-on="blur" active v-model="formData.firstname" label="Prenom" variant="outlined"></v-text-field>
            <v-text-field :rules="[rules.emptyOrMinLength(3), rules.maxLength(25)]" validate-on="blur" active v-model="formData.lastname" label="Nom" variant="outlined"></v-text-field>
            <v-combobox
              :readonly="isFormLoading"
              label="Profile*"
              :rules="[rules.isValidProfile]"
              :items="profileList.value"
              v-model="formData.profile"
            ></v-combobox>
            <v-text-field :rules="[rules.isValidAdress]" validate-on="blur" active v-model="formData.adress" label="Adresse" variant="outlined"></v-text-field>
            <v-text-field :rules="[rules.isValidZipCode]" validate-on="blur" active v-model="formData.zip_code" label="Code postal" variant="outlined"></v-text-field>
            <v-text-field :rules="[rules.emptyOrMinLength(3)]" validate-on="blur" active v-model="formData.city" label="Ville" variant="outlined"></v-text-field>

            <div class="btnContainer">
              <v-btn
                :loading="isFormLoading"
                color="success"
                block
                class="mt-4"
                type="submit"
              >
                Valider
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

const isFormLoading :Ref<boolean> = ref(false)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const avatarLoading: Ref<boolean> = ref(false)
const profileStore = useProfileStore();
const form = ref(null)
const avatarImg: Ref<any> = ref(null)
const isavatarImgChanged : Ref<boolean> = ref(false)
const { profiles, profile } = storeToRefs(profileStore);
const rules = {
  required: (value) => {
    return !!value || 'Veuillez entrer une valeur valide'
  },
  minLength: ( minLength) => {
    return (value) => value.length < minLength ? 'Le mot de passe doit contenir au minimum ' + minLength + ' charactéres' : true
  },
  maxLength: (maxLength) => {
    return (value) => {
      if (value) {
        value.length > maxLength ? `Le mot de passe doit contenir au maximum ${maxLength} charactéres` : true
      } else {
        return true
      }
    } 
  },
  isValidEmail: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Adresse email invalide';
  },
  emptyOrMinLength: (minLength) => {
    return (value) => {
      if (value) {
        return value.length >= minLength ? true : `Veuillez avoir au minmum ${minLength} characthéres ou laisser le champ vide`
      }
      else {
        return true
      }
    } 
  },
  isValidProfile: (value) => {
    return profileList.value.value.includes(value) ? true : "le nom de profile n'existe pas, verifiez la syntaxe"
  },
  isValidZipCode: (value) => {
    if (value) {
      return !isNaN(+value) && ( value.length < 6 && value.length > 4 )  ?  true : 'Veuillez entrer un code postal correct' 
    }
    return true
  },
  isValidAdress: (value) => {
    const adressRegex = /^\d{1,3}\s[a-zA-Z\s]+$/
    if (value) {
      return adressRegex.test(value) || !value.length ? true : 'Veuillez entrer une adresse correct'
    } else {
      return true
    }
  }
}

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
  formData.lastname = user.value.lastname?.toUpperCase()
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
      isavatarImgChanged.value = true
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
  const isValidForm = await form.value.validate()
  console.log(isValidForm)
  if (isValidForm.valid) {
    isFormLoading.value = true
    const profile_id = await profileStore.fetchProfileIdByName(formData.profile)
    let avatar_url = user.value?.avatar || '/user-placeholder.png';
    if (isavatarImgChanged.value) {
      avatar_url = await userStore.uploadAvatarImage(avatarImg.value, user.value?.id) || '/user-placeholder.png';
    }
    if (avatar_url && profile_id) {
      await userStore.updateUser({
        id: user.value?.id,
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        avatar : avatar_url,
        email: formData.email,
        profile_id: profile_id,
        adress: formData.adress,
        zip_code: formData.zip_code,
        city : formData.city
      })
      isFormLoading.value = false
      router.push('/user/profile')
    } else {
      console.log("erreur : pas de profile_id ou de url pour l'avatar")
    }
  } else {
    console.log('Erreur dans le formulaire')
    isFormLoading.value = false
  }
  
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
.validateButton{
  transform: scale(1.25);
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
  width:100%;
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
