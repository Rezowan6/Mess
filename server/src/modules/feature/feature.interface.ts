export interface ICreateFeatureInput {
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
}

export interface IUpdateFeatureInput {
  name?: string;
  slug?: string;
  description?: string | null;
  isActive?: boolean;
}
