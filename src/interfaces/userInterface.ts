export default interface UserInterface {
  id?: number,
  avatar?: string,
  username: string,
  email: string,
  firstname?: string,
  lastname?: string,
  registered_at?: Date,
  modified_at? : Date | string,
  city?: string,
  adress?: string,
  zip_code?: string,
  profile_id: string
}