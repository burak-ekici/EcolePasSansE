import { defineStore } from "pinia";
import { PostsInterface } from "@/interfaces/postInterface";
import DATA from '../../DATA.json'

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      posts: [] as Array<PostsInterface>,
    };
  },
  
  getters: {
    getPost : (state)=> {
      return (id: number | string) => {
        return state.posts.find((post: PostsInterface) => String(post.id) === String(id));
      }
    }
  },
  actions: {
    async getPosts() {
      try {
        this.posts = DATA; 
        for (let post of this.posts) {
          const url = post.src;

          const response = await fetch(url);

          if (response.status === 200) {
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            post.src = imageObjectURL;
          }
        }
      } catch (e) {
        console.log(e);
      }  
    },
  }
});
