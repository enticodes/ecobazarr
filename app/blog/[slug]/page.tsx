import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BlogDetailContent } from "@/components/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Ecobazar Organic Grocery",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | Ecobazar Blog`,
    description: post.excerpt,
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full py-24 text-center text-sm text-gray-400">
          Loading article...
        </div>
      }
    >
      <BlogDetailContent slug={slug} />
    </Suspense>
  );
}
