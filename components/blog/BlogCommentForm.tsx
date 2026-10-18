"use client";

import React, { useState } from "react";
import { MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import type { BlogComment } from "@/types";

export interface BlogCommentFormProps {
  onAddComment: (comment: BlogComment) => void;
}

export const BlogCommentForm: React.FC<BlogCommentFormProps> = ({ onAddComment }) => {
  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  });
  const [errors, setErrors] = useState<{ author?: string; email?: string; content?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const validate = () => {
    const newErrors: { author?: string; email?: string; content?: string } = {};
    if (!formData.author.trim() || formData.author.trim().length < 2) {
      newErrors.author = "Please enter your name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.content.trim() || formData.content.trim().length < 5) {
      newErrors.content = "Comment must be at least 5 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newComment: BlogComment = {
        id: `c-local-${Date.now()}`,
        author: formData.author.trim(),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        date: "Just now",
        content: formData.content.trim(),
      };
      onAddComment(newComment);
      setFormData({ author: "", email: "", content: "" });
      setSubmittedMessage(true);
      setTimeout(() => setSubmittedMessage(false), 5000);
    }, 400);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold font-sans text-gray-900">
          Leave a Comment
        </h3>
        <p className="text-xs text-gray-500">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      {submittedMessage && (
        <div className="p-3.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          Thank you! Your comment has been added locally.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="comment-author" className="block text-xs font-bold text-gray-700">
              Full Name *
            </label>
            <input
              id="comment-author"
              type="text"
              placeholder="e.g. Jane Doe"
              value={formData.author}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, author: e.target.value }));
                if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }));
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${
                errors.author ? "border-danger" : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.author && (
              <p className="flex items-center gap-1 text-[11px] text-danger">
                <AlertCircle className="w-3 h-3" />
                {errors.author}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="comment-email" className="block text-xs font-bold text-gray-700">
              Email Address *
            </label>
            <input
              id="comment-email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, email: e.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${
                errors.email ? "border-danger" : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-[11px] text-danger">
                <AlertCircle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="comment-content" className="block text-xs font-bold text-gray-700">
            Comment *
          </label>
          <textarea
            id="comment-content"
            rows={4}
            placeholder="Share your thoughts on this article..."
            value={formData.content}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, content: e.target.value }));
              if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
            }}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors resize-y ${
              errors.content ? "border-danger" : "border-gray-200 focus:border-primary"
            }`}
          />
          {errors.content && (
            <p className="flex items-center gap-1 text-[11px] text-danger">
              <AlertCircle className="w-3 h-3" />
              {errors.content}
            </p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<MessageSquare className="w-4 h-4" />}
          >
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};
