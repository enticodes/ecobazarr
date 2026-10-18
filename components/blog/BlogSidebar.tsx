"use client";

import React from "react";
import Link from "next/link";
import { Search, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { BLOG_CATEGORIES, BLOG_TAGS, BLOG_POSTS } from "@/data/blogPosts";

export interface BlogSidebarProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  selectedCategory?: string;
  onCategorySelect?: (cat: string) => void;
  selectedTag?: string;
  onTagSelect?: (tag: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  searchQuery = "",
  onSearchChange,
  selectedCategory = "All",
  onCategorySelect,
  selectedTag = "",
  onTagSelect,
}) => {
  const recentPosts = BLOG_POSTS.slice(0, 3);

  return (
    <aside className="w-full space-y-8" aria-label="Blog Sidebar">
      {/* 1. Search Box */}
      {onSearchChange && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-3">
          <label htmlFor="blog-search" className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
            Search Articles
          </label>
          <div className="relative">
            <input
              id="blog-search"
              type="text"
              placeholder="Search by title or topic..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* 2. Top Categories */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-sans border-b border-gray-100 pb-3">
          Top Categories
        </h3>
        <ul className="space-y-2">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => onCategorySelect && onCategorySelect(cat.name)}
                  className={`w-full flex items-center justify-between text-xs sm:text-sm py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">
                    ({cat.count})
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Recent Posts */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-sans border-b border-gray-100 pb-3">
          Recent Posts
        </h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-3 group">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Popular Tags */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-900 font-sans border-b border-gray-100 pb-3">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {BLOG_TAGS.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  onTagSelect && onTagSelect(isActive ? "" : tag)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Promotional Mini Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-linear-to-br from-green-900 via-primary-hard to-green-950 shadow-md">
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-accent-orange" />
            <span>Special Deal</span>
          </div>
          <h4 className="text-lg font-bold font-sans leading-tight">
            Fresh Organic Food On Demand
          </h4>
          <p className="text-xs text-white/80 leading-relaxed">
            Get up to 75% OFF on select seasonal organic produce bundles this week.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-4 py-2 rounded-full bg-white text-gray-900 hover:bg-primary hover:text-white transition-colors text-xs font-bold shadow-xs"
            >
              Shop Deals Now
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
