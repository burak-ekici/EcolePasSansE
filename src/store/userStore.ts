// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: ()=>{
    return {
      connected : true as boolean
    }
  },
  getters: {
    isUserConnected : (state) => {
      return state.connected
    }
  }
})