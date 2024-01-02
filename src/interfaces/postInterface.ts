export interface PostsInterface {
  id: number;
  title: string;
  short: string;
  description: string;
  published_at: Date;
  last_modified_date?: Date;
  image_src: string;
  image_alt: string;
}