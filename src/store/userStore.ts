// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";
import User from '@/interfaces/userInterface'
import router from "@/router";
// verifie si un utilisateur est connecté lors de l'initialisation de l'application


export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user : null as User |null,
    };
  },
  getters: {
  
  },
  actions: {
    async createAccount({ email , password , profile , username }) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        if (data.user) {
          this.createUser({ profile , username , email, id : data.user.id });
          this.switchStoreUserConnectedStateToTrue();
          return data;
        }
        return null
      } catch (error) {
        if (error instanceof Error) {
          console.log(error)
        }
        return error;
      }
    },
    async createUser({ profile, username, email , id }) {
      const userProfile_id = await this.getUserProfile(profile);
      if (userProfile_id) {
        const { data, error } = await supabase.from("Users").insert([
          {
            id : id,
            avatar: "",
            username: username,
            email: email,
            firstname: "",
            lastname: "",
            registered_at: new Date(Date.now()),
            modified_at: null,
            city: "",
            adress: "",
            zip_code: 0,
            profile_id: userProfile_id,
          },
        ]);
        if (data) {
          console.log(data);
          console.log("creation d'utilisateur reussie");
          return data;
        }
        if (error) {
          console.error("Erreur lors de l'ajout de l'élément:", error);
        }
      }
      return null
    },
    async updateUser({ id, username , firstname , lastname , email , avatar , adress , profile_id, zip_code ,city } : User) {
      try {
        const { data, error } = await supabase
          .from("Users")
          .update({
            username,
            firstname,
            lastname,
            email,
            avatar,
            adress,
            profile_id,
            zip_code,
            city,
            modified_at: new Date(Date.now()),
          })
          .eq( 'id' , id )
          .select();
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e)
      }
    },
    async uploadAvatarImage(file, userId) {
      if (file && userId) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`/${userId}/`, file);
        if (error) {
          console.error("Error uploading image:", error);
          return null;
        }
        return data;
      }
      return null
    },
    async login(email: string, password: string) {
      try {
        const isAlreadyConnected: any = await this.seeCurrentUser();
        if (!isAlreadyConnected) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (data.user) {
            this.connected = true;
            this.user = await this.getUserInfo(data.user.id);
            return data
          }
          if (error) {
            throw error;
          }
          return null
        } else {
          console.log("il y à deja un utilisateur connecté");
        }
        return null
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        alert("Une Erreur est survenue lors de la tentative de deconnexion");
        return false;
      }
      this.connected = false;
      this.user = null
      router.push('/')
      return true;
    },
    async editAccount() {},
    async seeCurrentUser() {
      try {
        // la fonction envoie une session si un user est connecté ou null s'il y en à pas .
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          this.switchStoreUserConnectedStateToTrue();
          this.user = await this.getUserInfo(data.session.user.id)
          return data
        }
        if (error) {
          console.error(error)
          throw new Error(error.message)
        }
        if (data === null) {
          throw new Error("il n'y a pas d'utilisateur connecté / pas de session à récuperer")
        }
        return null
      } catch (e) {
        console.log(e)
        return null
      }
      
    },
    async getUserInfo(id : any) {
      try {
        const { data: Users, error } = await supabase.from("Users").select("*").eq('id', id).single();
        if (Users) {
          return Users
        }
        if( error) throw error
        return null
      } catch (e) {
        console.log(e)
      }
      return null
    },
    async getUserProfile(profileName : string) {
      try {
        const { data: Profile, error } = await supabase
          .from("Profile")
          .select("id, name")
          .eq('name', profileName)
          .single();
        if (error) throw error;
        if (Profile) {
          return Profile.id;
        }
        return null;
      } catch (e) {
        console.log(e)
      }
      
    },
    switchStoreUserConnectedStateToTrue(){
      if (this.connected) return;
      this.isConnectionChecked = true;
      this.connected = true;
    },
  },
});
