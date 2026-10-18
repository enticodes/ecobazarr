import React from "react";
import Link from "next/link";
import { Tag, User, MessageCircle, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

export interface BlogCardProps {
  post: BlogPost;
  variant?: "grid" | "list";
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "grid" }) => {
  const [day, month] = post.date.split(" ");

  return (
    <article className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      {/* Thumbnail with Date Badge */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-50">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-lg shadow-sm text-center">
          <span className="text-sm font-extrabold text-gray-900 block leading-tight">
            {day}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">
            {month}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" />
              <span>{post.category}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <span>{post.commentsCount} Comments</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors font-sans line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-3 border-t border-gray-50">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-hover transition-colors"
          >
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
