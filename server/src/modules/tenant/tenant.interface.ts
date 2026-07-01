export interface ITenant {
  id?: number;
  name: string;
  slug: string;
  isActive?: boolean;
  ownerId?: number;
  plan?: "free" | "basic" | "premium";
  createdAt?: Date;
  updatedAt?: Date;
}