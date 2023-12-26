export interface PostsInterface {
  id: number,
  title: string,
  short: string,
  description: string,
  publish_date: Date,
  last_modified_date?: Date,
  src: string,
  alt: string
}