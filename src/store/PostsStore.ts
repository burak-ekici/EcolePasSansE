import { defineStore } from "pinia";
import { PostsInterface } from "@/interfaces/postsInterface";
import DATA from '../../DATA.json'

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      posts: [] as Array<PostsInterface>,
    };
  },
  actions: {
    async getPosts() {
      try {
        this.posts = DATA; 
      } catch (e) {
        console.log(e);
      }  
    },
  },
  getters: {
    getPost : (state)=> {
      return (id: number | string) => {
        return state.posts.find((post: PostsInterface) => String(post.id) === String(id));
      }
    }
  }
});
