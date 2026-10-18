"use client";

import React, { useState, useMemo } from "react";
import { ShopBreadcrumbs } from "@/components/shop";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogCard } from "./BlogCard";
import { BlogSidebar } from "./BlogSidebar";
import { ChevronLeft, ChevronRight, X, Newspaper } from "lucide-react";

const POSTS_PER_PAGE = 4;

export const BlogListContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesTag =
        !selectedTag ||
        (post.tags && post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const currentPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedCategory !== "All" || selectedTag !== "";

  return (
    <div className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs items={[{ label: "Blog" }]} />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Main Articles Stream (Left 2/3) */}
          <main className="flex-1 w-full min-w-0 space-y-8" aria-label="Blog Articles">
            {/* Active Filters Bar */}
            {hasActiveFilters && (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-gray-500">Filtered by:</span>
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                      Category: {selectedCategory}
                      <button
                        type="button"
                        onClick={() => setSelectedCategory("All")}
                        className="hover:text-primary-hover"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedTag && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                      Tag: #{selectedTag}
                      <button
                        type="button"
                        onClick={() => setSelectedTag("")}
                        className="hover:text-primary-hover"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                      &ldquo;{searchQuery}&rdquo;
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="hover:text-primary-hover"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-bold text-primary hover:underline"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Articles Grid */}
            {currentPosts.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-xl border border-dashed border-gray-200 space-y-4">
                <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
                <h2 className="text-lg font-bold text-gray-800 font-sans">
                  No articles matched your criteria
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                  Try clearing your search keyword, category, or tag filter to view all published guides.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-xs"
                  >
                    View All Articles
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous Page"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-xs"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next Page"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center transition-colors shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>

          {/* Right Sidebar (1/3) */}
          <div className="w-full lg:w-80 shrink-0">
            <BlogSidebar
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              selectedCategory={selectedCategory}
              onCategorySelect={(cat) => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              selectedTag={selectedTag}
              onTagSelect={(tag) => {
                setSelectedTag(tag);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
