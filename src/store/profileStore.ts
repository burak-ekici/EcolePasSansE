import { defineStore } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";

export const useProfileStore = defineStore("profileStore", {
  state: () => {
    return {
      profiles: [] as any,
      profile : ''
    }
  },
  getters: {
    getProfile: (state) => {
      return state.profile
    }
  },
  actions: {
    async fetchProfiles() {
      try {
        const { data , error } = await supabase.from("Profile").select("name")
        if (data && data.length > 0) {
          this.profiles = []
          for (const el of data) {
            this.profiles.push(el.name)
          }
          return this.profiles;
        }
        if (error) {
          throw error
        }
        return null
      } catch (e) {
        console.log(e)
      }
      return null
    },
    async fetchProfileNameById(id) {
      try {
        const { data, error } = await supabase.from("Profile").select("name").eq('id',id).single();
        if (error) throw error;
        if (data && data.name) {
          this.profile = data.name
          return this.profile
        }
        return null
      } catch (e) {
        console.log(e)
      }
      return null
    },
    async fetchProfileIdByName(name) {
      try {
        const { data, error } = await supabase
          .from("Profile")
          .select("id")
          .eq("name", name)
          .single();
        if (error) throw error;
        if (data && data.id) {
          return data.id;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
      return null;
    }
  }
})
