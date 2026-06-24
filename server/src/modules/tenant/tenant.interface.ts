export interface ITenant {
  id?: number;
  messName: string;
  slug: string;
  isActive?: boolean;
  ownerId?: number;
  plan?: "free" | "basic" | "premium";
  createdAt?: Date;
  updatedAt?: Date;
}