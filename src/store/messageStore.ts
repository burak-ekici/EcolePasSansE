import { defineStore, storeToRefs } from "pinia";
import { supabase } from "../supabaseConfig/supabaseClient";
import { MessageInterface } from "@/interfaces/messageInterface";
import  useNotifications  from "@/composables/useNotifications";

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
          .select("*")
          .innerJoin("Salon_Users", { on: "salon.id = Salon_Users.salon_id" })
          .eq("Salon_Users.user_id", userId);
        if (error) throw error;
        console.log(data);
      } catch (e) {
        console.log(e);
        addNotification({
          message: "Erreur lors de la récupération des salons",
          type: "error",
        });
      }
    },
  },
});
