export interface SalonInterface {
  id: string;
  name?: string; // il a un "name" si c'est un salon de groupe
  created_at: Date;
  messages_id: string[];
  isOpen: boolean;
}
