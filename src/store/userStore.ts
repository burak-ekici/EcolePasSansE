// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";
import {supabase} from '../supabaseConfig/supabaseClient'

export const useUserStore = defineStore('userStore', {
  state: ()=>{
    return {
      connected : false as boolean
    }
  },
  getters: {
    isUserConnected : (state) => {
      return state.connected
    }
  },
  actions: {
    async createAccount(email : string, password : string) {
      try { 
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password : password
        })
        if (error) throw error
        console.log(data)
      }
      catch (error) {
        if (error instanceof Error) {
          console.log(error)
          alert(error.message);
        }
      }
      
    },
    async login() {
      
    },
    async logout() {
      
    },
    async editAccount() {
      
    },
    async didUserAlreadyExist(username: string): boolean{
      return false
    }
  }
})