import { defineStore } from "pinia";
import { PostsInterface } from "@/interfaces/postInterface";
import { supabase } from "@/supabaseConfig/supabaseClient";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      posts: null as PostsInterface[] | null,
    };
  },
  getters: {
    getPost: (state) => {
      return (id: number | string): PostsInterface | null => {
        return state.posts?.find(
          (post: PostsInterface) => String(post.id) === String(id)
        ) || null;
      };
    },
    getPosts: (state): PostsInterface[] | null => {
      return state.posts;
    },
  },
  actions: {
    async fetchPosts(): Promise<PostsInterface[] | null> {
      try {
        const { data, error } = await supabase.from("posts").select("*");
        if (data && data.length > 0) {
          this.posts = data;
          return data;
        }
        if (error) throw error;
        return null;
      } catch (e) {
        console.log(e);
        return null;
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
    async createPost(post: PostsInterface): Promise<PostsInterface[] | null> {
      try {
        const { data, error } = await supabase.from("posts").insert(post);
        if (error) throw error;
        if (data) {
          return data;
        }
        return null;
      } catch (e) {
        console.log(e);
        return null;
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
    },
  },
});
