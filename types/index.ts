export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number; // 0 to 5
  reviewCount: number;
  images: string[];
  description: string;
  additionalInfo?: {
    weight?: string;
    color?: string;
    type?: string;
    category?: string;
    stockStatus?: 'In Stock' | 'Out of Stock';
    tags?: string[];
  };
  inStock: boolean;
  isHotDeal?: boolean;
  dealEndsAt?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  country: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeShipping?: boolean;
  minSubtotal?: number;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: 'Order Received' | 'Processing' | 'On the road' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: 'cod' | 'paypal' | 'card';
  orderNotes?: string;
}

export interface FilterState {
  category: string | null;
  priceRange: [number, number];
  rating: number | null;
  tags: string[];
  inStockOnly: boolean;
  sortBy: 'latest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogComment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  authorBio?: string;
  commentsCount: number;
  image: string;
  excerpt: string;
  category: string;
  content?: string[];
  tags?: string[];
  readTime?: string;
  comments?: BlogComment[];
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    pinterest?: string;
    instagram?: string;
  };
}

