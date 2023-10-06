// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";
import {supabase} from '../supabaseConfig/supabaseClient'

export const useUserStore = defineStore('userStore', {
  state: ()=>{
    return {
      connected: false as boolean,
      isConnectionChecked: false, // variable qui permet d'empecher d'envoyer des requêtes au serveur pour chaque changement de page sur page necessitant un check de conexion , car l'application n'a pas le temp de changer la valeur de connected et donc empeche la navigation sur les pages via le lien ( celui ci recharge la page et donc reset le store ) necéssitant une connexion même si l'on est connecté. via la navigation normal, il n'y a aucun soucis
    };
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
        this.switchStoreUserConnectedStateToTrue();
        const actualUser = await this.seeCurrentUser();
        console.log(actualUser);
        return data
      }
      catch (error) {
        if (error instanceof Error) {
          console.log(error)
          alert(error.message);
        }
        return error
      }
      
    },
    async login(email: string, password: string) {
      try {
        let actualUser = await this.seeCurrentUser()
        if (actualUser.data.session === null) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) {
            throw error;
          } else {
            this.switchStoreUserConnectedStateToTrue();
            actualUser = await this.seeCurrentUser()
            return data;
          }
        } else {
          console.log('il y à deja un utilisateur connecté')
        }
      } catch (error) {
        console.log(error);
        return error
      }
      
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        alert('Une Erreur est survenue lors de la tentative de deconnexion');
        return false;
      }
      const actualUser = await this.seeCurrentUser();
      console.log(actualUser);
      this.connected = false;
      return true;
    },
    async editAccount() {
      
    },
    async seeCurrentUser(){
      const actualUser = await supabase.auth.getSession();
      return actualUser
    },
    switchStoreUserConnectedStateToTrue() {
      this.isConnectionChecked = true;
      this.connected = true
    }
  }
})