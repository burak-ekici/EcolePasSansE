// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";
import User from '@/interfaces/userInterface'
import router from "@/router";


export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user : null as User |null,
    };
  },
  getters: {
  
  },
  actions: {
    async createAccount({ email , password , profile_id , username }) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              email: email,
              profileid: profile_id
            },
          },
        });
        if (data) {
          return data;
        }
        if (error) throw error;
        return null
      } catch (error) {
        console.log(error)
      }
    },
    async updateUser({ id, username , firstname , lastname , email , avatar , adress , profile_id, zip_code ,city } : User) {
      try {
        const { data, error } = await supabase
          .from("users")
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
    async forgottenPAssword(email) {
      // Sends the user a log in link via email. Once logged in you should direct the user to a new password form. And use "Update User" below to save the new password.
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email
        );
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    },
    async uploadAvatarImage(file, userId) {
      if (file && userId) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(
            `/${userId}/`,
            file,
            { upsert: true }
          );
        if (error) {
          console.error("Error uploading image:", error);
          return null;
        }
        if (data) {
          console.log(data)
          const url = `https://kqxafknfgpkptwuvppjv.supabase.co/storage/v1/object/public/avatars/${userId}?v=${Math.random()}`;
          return url;
        }
        return null
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
        if (error.message == "Email not confirmed") {
          alert('Veuillez valider votre Email')
        } else {
          console.log(error);
        }
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
        const { data: users, error } = await supabase.from("users").select("*").eq('id', id).single();
        if (users) {
          return users
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
      
    }
  },
});
