import { defineStore } from 'pinia'

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      layoutName: 'DefaultLayout',
    }
  },
  actions: {
    changeLayout(): void {
      if (this.layoutName === 'DefaultLayout') {
        this.layoutName = "KidsLayout";
      } else {
        this.layoutName = "DefaultLayout";
      }
    },
    setLayoutName(name: string) {
      this.layoutName = name
    }
  }
})