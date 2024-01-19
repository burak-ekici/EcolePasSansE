export interface PostsInterface {
  id: number;
  title: string;
  short: string;
  description: string;
  published_at: Date;
  modified_at?: Date;
  image_src: string;
  image_alt: string;
  author: string;
}