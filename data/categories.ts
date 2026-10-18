export interface HomeCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
}

export const POPULAR_CATEGORIES: HomeCategory[] = [
  {
    id: "1",
    name: "Fresh Fruit",
    slug: "fresh-fruit",
    itemCount: 134,
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "2",
    name: "Fresh Vegetables",
    slug: "vegetables",
    itemCount: 165,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "3",
    name: "Meat & Fish",
    slug: "meat-fish",
    itemCount: 82,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "4",
    name: "Snacks",
    slug: "snacks",
    itemCount: 56,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "5",
    name: "Beverages",
    slug: "beverages",
    itemCount: 94,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "6",
    name: "Beauty & Health",
    slug: "beauty-health",
    itemCount: 48,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "7",
    name: "Bread & Bakery",
    slug: "bread-bakery",
    itemCount: 110,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "8",
    name: "Baking Needs",
    slug: "baking-needs",
    itemCount: 37,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "9",
    name: "Cooking",
    slug: "cooking",
    itemCount: 75,
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "10",
    name: "Diabetic Food",
    slug: "diabetic-food",
    itemCount: 29,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "11",
    name: "Dish Detergents",
    slug: "dish-detergents",
    itemCount: 18,
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "12",
    name: "Oil",
    slug: "oil",
    itemCount: 42,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80",
  },
];
