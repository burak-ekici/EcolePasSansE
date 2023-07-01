import { defineStore } from "pinia";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      posts : [] as any
    };
  },
  actions: {
    async getPosts() {
      try {
        for (let i = 1; i <= 6; i++) {
          const response = await fetch("https://picsum.photos/1300/1080");
          this.posts.push({
            id: i,
            src: response.url,
            title: `titre n ${i}`,
            description: "lorem ipsum dolor si",
          });
        }
      } catch (e) {
        console.log(e);
      }  
    },
  },
});
