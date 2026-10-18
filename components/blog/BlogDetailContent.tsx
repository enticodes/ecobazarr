"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  User,
  MessageCircle,
  Calendar,
  Clock,
  Quote,
  Share2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/common";
import { ShopBreadcrumbs } from "@/components/shop";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogSidebar } from "./BlogSidebar";
import { BlogCommentForm } from "./BlogCommentForm";
import type { BlogComment } from "@/types";

export interface BlogDetailContentProps {
  slug: string;
}

export const BlogDetailContent: React.FC<BlogDetailContentProps> = ({ slug }) => {
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? BLOG_POSTS[currentIndex] : null;

  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost =
    currentIndex !== -1 && currentIndex < BLOG_POSTS.length - 1
      ? BLOG_POSTS[currentIndex + 1]
      : null;

  const [comments, setComments] = useState<BlogComment[]>(post?.comments || []);

  if (!post) {
    return (
      <div className="w-full bg-white pb-20">
        <ShopBreadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: "Article Not Found" }]} />
        <div className="max-w-[1320px] mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 font-sans">
            Article Not Found
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            The article you are looking for may have been moved or does not exist.
          </p>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddComment = (newComment: BlogComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleShare = (network: string) => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(post.title);
      let shareUrl = "";
      if (network === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      if (network === "twitter") shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      if (network === "linkedin") shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      if (shareUrl) window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="w-full bg-white pb-16 sm:pb-24">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Main Article Reader (Left 2/3) */}
          <main className="flex-1 w-full min-w-0 space-y-8" aria-label="Article Details">
            <article className="space-y-6">
              {/* Featured Image */}
              <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden shadow-sm bg-gray-100 border border-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium border-b border-gray-100 pb-4">
                <span className="flex items-center gap-1.5 text-primary font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{post.category}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{post.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                  <span>{comments.length} Comments</span>
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5 ml-auto text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-sans text-gray-900 tracking-tight leading-snug">
                {post.title}
              </h1>

              {/* Content Paragraphs */}
              <div className="space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                {post.content && post.content.length > 0 ? (
                  post.content.map((paragraph, idx) => (
                    <React.Fragment key={idx}>
                      <p>{paragraph}</p>
                      {/* Pullquote after second paragraph */}
                      {idx === 1 && (
                        <blockquote className="my-6 p-6 rounded-xl bg-primary/5 border-l-4 border-primary text-gray-800 font-medium italic relative">
                          <Quote className="w-8 h-8 text-primary/20 absolute right-4 top-4 pointer-events-none" />
                          &ldquo;Clean living starts with soil-first agriculture. When we nurture our
                          microbiome with unadulterated organic crops, we build lifelong resilience.&rdquo;
                        </blockquote>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p>{post.excerpt}</p>
                )}
              </div>

              {/* Tags & Social Share */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">Tags:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Share */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-gray-500 mr-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleShare("facebook")}
                    aria-label="Share on Facebook"
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <FacebookIcon className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare("twitter")}
                    aria-label="Share on Twitter"
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare("linkedin")}
                    aria-label="Share on LinkedIn"
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Author Bio Card */}
              {post.authorBio && (
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  {post.authorAvatar && (
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-16 h-16 rounded-full object-cover shrink-0 border border-white shadow-xs"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h4 className="text-base font-bold text-gray-900 font-sans">
                        {post.author}
                      </h4>
                      {post.authorRole && (
                        <span className="text-xs font-semibold text-primary">
                          ({post.authorRole})
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {post.authorBio}
                    </p>
                  </div>
                </div>
              )}

              {/* Prev / Next Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="p-4 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-gray-50 transition-all flex items-center gap-3 group text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white text-gray-600 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                        Previous Post
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                        {prevPost.title}
                      </h5>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="p-4 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-gray-50 transition-all flex items-center justify-end gap-3 group text-right"
                  >
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                        Next Post
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                        {nextPost.title}
                      </h5>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-primary group-hover:text-white text-gray-600 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>

            {/* Comments List */}
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold font-sans text-gray-900">
                Comments ({comments.length})
              </h3>

              {comments.length === 0 ? (
                <p className="text-xs text-gray-400 italic">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-5 rounded-xl border border-gray-100 bg-white shadow-2xs space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">
                            {comment.author}
                          </h4>
                          <span className="text-[11px] text-gray-400">
                            {comment.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-13">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Leave a Comment Form */}
            <BlogCommentForm onAddComment={handleAddComment} />
          </main>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <BlogSidebar selectedCategory={post.category} />
          </div>
        </div>
      </div>
    </div>
  );
};
