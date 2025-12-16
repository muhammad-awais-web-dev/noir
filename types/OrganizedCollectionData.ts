import Product from "./productType";

interface OrganizedCollectionData {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  updated_at: string;
  image: {
    id: number;
    created_at: string;
    src: string;
    alt: string;
  };
  products_count: number;
  products: Product[];
}

interface UnOrganizedCollectionData {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  updated_at: string;
  image: { id: number; created_at: string; src: string; alt: string };
  products_count: number;
}

export type { UnOrganizedCollectionData, OrganizedCollectionData };
