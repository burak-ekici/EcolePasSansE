// Verifie l'etat du User : s'il est connecté ou non , l'id, le nom etc...
import { defineStore } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";
import User from "@/interfaces/userInterface";
import router from "@/router";
import useNotifications from "@/composables/useNotifications";

const { addNotification } = useNotifications()

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {},
  actions: {
    async createAccount({ email, password, profile_id, username }) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              username: username,
              email: email,
              profileid: profile_id,
            },
          },
        });
        if (data) {
          addNotification({
            message: "Votre compte à bien été creer, veuillez activer votre compte via votre boîte mail",
            type: "success",
          });
          return data;
        }
        if (error) throw error;
        return null;
      } catch (error) {
        console.log(error);
      }
    },
    async updateUser({
      id,
      username,
      firstname,
      lastname,
      email,
      avatar,
      adress,
      profile_id,
      zip_code,
      city,
    }: User) {
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
          .eq("id", id)
          .select();
        if (error) throw error;
        if (data) {
          addNotification({
            message: "Votre profile à bien été mis à jour",
            timeout: 5000,
            type: "success",
          });
          return data;
        }
        return null;
      } catch (e) {
        addNotification({
          message: `Erreur lors de la mis à jour du profile"  ${e.message ? e.message : ''}`,
          type: "error",
        });
        console.log(e);
      }
    },
    async resetPassword(email) {  
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: "http://localhost:3000/user/edit_password",
          }
        );
        if (error) throw error;
        if (data) {
          addNotification({
            message: `Un email vien d'être envoyé`,
            timeout: 5000,
            type: "success",
          });
          return data;
        }
        return null
      } catch (error) {
        addNotification({
          message: `Erreur lors de l'envoie du mail`,
          type: "error",
        });
        console.log(error);
      }
    },
    async updatePassword(new_password) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          password: new_password
        });
        if (error) throw error
        if (data) {
          addNotification({
            message: `Mot de passe modifié`,
            timeout: 5000,
            type: "success",
          });
          return data
        }
        return null
      } catch (e) {
        addNotification({
          message: `Une erreur est survenu lors de la modification du mot de passe`,
          type: "error",
        });
        console.log(e)
      }
      
    },
    async uploadAvatarImage(file, userId) {
      if (file && userId) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`/${userId}/`, file, { upsert: true });
        if (error) {
          addNotification({
            message: "Erreur lors de l'uploading de l'image",
            type: "error",
          });
          return null;
        }
        if (data) {
          addNotification({
            message: "l'image à bien été uploadé",
            timeout: 5000,
            type: "success",
          });
          const url = `https://kqxafknfgpkptwuvppjv.supabase.co/storage/v1/object/public/avatars/${
            userId + "?v=" + Math.random()
            }`;
          return url;
        }
        return null;
      }
      return null;
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
            addNotification({
              message: "Connexion réussie",
              timeout : 5000,
              type: "success",
            });
            this.user = await this.getUserInfo(data.user.id);
            return data;
          }
          if (error) {
            throw error;
          }
          return null;
        } else {
          addNotification({ message: "il y à deja un utilisateur connecté",type: "error" });
        }
        return null;
      } catch (error) {
        if (error.message == "Email not confirmed") {
          addNotification({
            message: "Veuillez valider votre Email",
            type: "error",
          });
        } else {
          addNotification({
            message: "Email ou mot de passe incorrecte",
            type: "error",
          });
        }
      }
      return null;
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error);
        addNotification({
          message: "Erreur lors de la deconnection",
          type: "error",
        });
        return false;
      }
      addNotification({ message : "deconnection reussie" , timeout : 3000 , type : 'success' });
      this.user = null;
      router.push("/");
      return true;
    },
    async seeCurrentUser() {
      try {
        // la fonction envoie une session si un user est connecté ou null s'il y en à pas .
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          this.user = await this.getUserInfo(data.session.user.id);
          return data;
        }
        if (error) {
          console.error(error);
          throw new Error(error.message);
        }
        if (data === null) {
          throw new Error(
            "il n'y a pas d'utilisateur connecté / pas de session à récuperer"
          );
        }
        return null;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    async getUserInfo(id: any) {
      try {
        const { data: users, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();
        if (users) {
          return users;
        }
        if (error) throw error;
        return null;
      } catch (e) {
        console.log(e);
      }
      return null;
    },
    async getUserProfileIdByName(profileName: string) {
      try {
        const { data: Profile, error } = await supabase
          .from("Profile")
          .select("id, name")
          .eq("name", profileName)
          .single();
        if (error) throw error;
        if (Profile) {
          return Profile.id;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    },
    async getUserProfileNameById(id) {
      try {
        const { data, error } = await supabase.from("Profile").select('name').eq("id", id).single()
        if (error) throw error
        if (data && Object.keys(data).length > 0) {
          return data
        } else {
          return null
        }
      } catch (e) {
        addNotification({
          message: "Erreur lors de la recuperation du profile",
          type: "error",
        });
        console.log(e)
      }
    }
  },
});
