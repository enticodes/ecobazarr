import React from "react";
import Link from "next/link";
import { Tag, User, MessageCircle, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";

export const LatestNews: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-gray-100" aria-label="Latest News">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Blog
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
            Latest News
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              {/* Media Thumbnail with Date Badge */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-50">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-lg shadow-sm text-center">
                  <span className="text-sm font-extrabold text-gray-900 block leading-tight">
                    {post.date.split(" ")[0]}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">
                    {post.date.split(" ")[1]}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-primary" />
                      {post.commentsCount} Comments
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors font-sans line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-dark transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
