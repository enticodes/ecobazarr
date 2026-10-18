"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/common/Button";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = "Please enter a subject topic.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief client interaction
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrors({});
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
      <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans text-gray-900 tracking-tight">
          Just Say Hello!
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Do you fancy saying hi to us or you&apos;ve got questions regarding our farm-fresh products?
          Send us a note below.
        </p>
      </div>

      {isSuccess ? (
        <div
          role="status"
          className="p-6 sm:p-8 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-4 animate-in fade-in duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900 font-sans">
              Thank You! Message Received
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your inquiry has been successfully validated. (Note: As this is a local frontend
              demonstration, no actual remote email was dispatched.)
            </p>
          </div>
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Send Another Message
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Dianne Russell"
                value={formData.fullName}
                onChange={handleChange}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${
                  errors.fullName
                    ? "border-danger focus:ring-1 focus:ring-danger"
                    : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${
                  errors.email
                    ? "border-danger focus:ring-1 focus:ring-danger"
                    : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label
              htmlFor="subject"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Subject <span className="text-danger">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can we assist you today?"
              value={formData.subject}
              onChange={handleChange}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${
                errors.subject
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors.subject && (
              <p id="subject-error" className="flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors resize-y ${
                errors.message
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
