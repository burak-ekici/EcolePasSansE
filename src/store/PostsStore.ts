import { defineStore } from "pinia";
import { PostsInterface } from "@/interfaces/postInterface";
import { supabase } from "@/supabaseConfig/supabaseClient";

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
    },
    getPosts: (state) => {
      return state.posts;
    }
  },
  actions: {
    async fetchPosts() {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (data && data.length > 0) {
          this.posts = data;
          return data
        }
        if (error) throw error;
        return null;
      } catch (e) {
        console.log(e);
      }  
    },
    async fetchPostById(id: number | string) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();
        if (data && Object.keys(data).length > 0) {
          return data;
        }
        if (error) throw error;
        return null;
      } catch (e) {
        console.log(e);
      }
    }, 
    async createPost(post: PostsInterface) {  
      try {
        const { data, error } = await supabase.from("posts").insert(post);
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    },
    async updatePost(post: PostsInterface) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .update(post)
          .eq("id", post.id);
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    },
    async deletePost(id: number | string) {
      try {
        const { data, error } = await supabase
          .from("posts")
          .delete()
          .eq("id", id);
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    }
  }
});
