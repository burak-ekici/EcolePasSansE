import { defineStore } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";
import { MessageInterface } from "@/interfaces/messageInterface";
import useNotifications from "@/composables/useNotifications";
import { v4 as uuidv4 } from "uuid";

const { addNotification } = useNotifications();


export const useMessageStore = defineStore("messageStore", {
  state: () => ({
    messages: null as MessageInterface[] | null,
  }),
  actions: {
    async fetchSalon(userId: number | string) {
      try {
        const { data, error } = await supabase
          .from("salon")
          .select("* , Salon_Users(*)")
          .eq('salon.id' , 'Salon_Users.salon_id')
          .eq("Salon_Users.user_id", userId);
        if (error) throw error;
        console.log('data :',data);
        return true
      } catch (e) {
        console.log(e);
        addNotification({
          message: "Erreur lors de la récupération des salons",
          type: "error",
        });
        return null
      }
    },
    async createSalon_AND_Salon_Users(userId : string) {
      try {
        const uuid = uuidv4();
        const { data, error } = await supabase
          .from("salon")
          .insert({ id: uuid, messages_id: [] });
        if (error) throw error;
        console.log(data);
        const { data : data2, error : error2 } = await supabase.from("Salon_Users").insert([
          { salon_id: uuid, user_id: userId }
        ]);
        console.log(data2, error2)
      } catch (e) {
        console.log(e);
        addNotification({
          message: "Erreur lors de la création du salon",
          type: "error",
        });
      }
    }
  },
});
