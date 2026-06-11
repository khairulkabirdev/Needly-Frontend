export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  choice?: boolean;
  rating: number;
  reviewsCount: string;
  imageUrl: string;
  image?: string;
  colors?: string[];
  discountPercent?: number;
  weight?: string;
  category: string;
  isFlashDeal?: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface FilterableSmartphone {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  badgeType: "discount" | "new" | "none";
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  storage: "64GB" | "128GB" | "256GB" | "512GB";
  screenSize: "under-5.5" | "5.5-6.1" | "6.1-6.7" | "above-6.7";
}

