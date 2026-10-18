import React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export interface ShopBreadcrumbItem {
  label: string;
  href?: string;
}

export interface ShopBreadcrumbsProps {
  items: ShopBreadcrumbItem[];
}

export const ShopBreadcrumbs: React.FC<ShopBreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-gray-50/80 border-b border-gray-100 py-3 sm:py-4 mb-6 sm:mb-8"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                {isLast || !item.href ? (
                  <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
