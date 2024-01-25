export interface MessageInterface {
  id?: number,
  from_user_id: number,
  to_user_id: number,
  message: string,
  created_at: Date,
  modified_at? : Date
}