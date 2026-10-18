"use client";

import React from "react";
import Link from "next/link";
import {
  Apple,
  Salad,
  Fish,
  UtensilsCrossed,
  Coffee,
  IceCream,
  Cake,
  Milk,
  Flame,
  HeartPulse,
  Sparkles,
  Droplet,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategoryDrawerOpen } from "@/store/slices/uiSlice";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: React.ReactNode;
}

export const CATEGORIES_LIST: CategoryItem[] = [
  { id: "1", name: "Fresh Fruit", slug: "fresh-fruit", icon: <Apple className="w-4 h-4 text-primary" /> },
  { id: "2", name: "Vegetables", slug: "vegetables", icon: <Salad className="w-4 h-4 text-primary" /> },
  { id: "3", name: "River Fish", slug: "river-fish", icon: <Fish className="w-4 h-4 text-primary" /> },
  { id: "4", name: "Chicken & Meat", slug: "chicken-meat", icon: <UtensilsCrossed className="w-4 h-4 text-primary" /> },
  { id: "5", name: "Drink & Water", slug: "drink-water", icon: <Coffee className="w-4 h-4 text-primary" /> },
  { id: "6", name: "Yogurt & Ice Cream", slug: "yogurt-ice-cream", icon: <IceCream className="w-4 h-4 text-primary" /> },
  { id: "7", name: "Cake & Bread", slug: "cake-bread", icon: <Cake className="w-4 h-4 text-primary" /> },
  { id: "8", name: "Butter & Cream", slug: "butter-cream", icon: <Milk className="w-4 h-4 text-primary" /> },
  { id: "9", name: "Cooking", slug: "cooking", icon: <Flame className="w-4 h-4 text-primary" /> },
  { id: "10", name: "Diabetic Food", slug: "diabetic-food", icon: <HeartPulse className="w-4 h-4 text-primary" /> },
  { id: "11", name: "Dish Detergents", slug: "dish-detergents", icon: <Sparkles className="w-4 h-4 text-primary" /> },
  { id: "12", name: "Oil", slug: "oil", icon: <Droplet className="w-4 h-4 text-primary" /> },
];

export const CategoryDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isCategoryDrawerOpen);

  if (!isOpen) return null;

  return (
    <div
      className="absolute left-0 top-full mt-0.5 w-72 bg-white border border-gray-200 rounded-b-lg shadow-dropdown z-50 animate-in fade-in slide-in-from-top-2 duration-150"
    >
      <ul className="py-2 divide-y divide-gray-50">
        {CATEGORIES_LIST.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/shop?category=${cat.slug}`}
              onClick={() => dispatch(setCategoryDrawerOpen(false))}
              className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary-tint/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 transition-transform group-hover:scale-110">
                  {cat.icon}
                </span>
                <span className="font-medium text-gray-800 group-hover:text-primary">
                  {cat.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
