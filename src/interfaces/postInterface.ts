export interface PostsInterface {
  id: number,
  title: string,
  short: string,
  description: string,
  publish_date: string,
  last_modified_date?: Date,
  src: string,
  alt: string
}