export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  is_seller: boolean;
  created_at: string;
};

export type Product = {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
};
