"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { PRODUCTS, type ProductReview } from "@/data/products";
import { RatingStars } from "@/components/common/RatingStars";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { QuantitySelector } from "@/components/common/QuantitySelector";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductQuickViewModal } from "@/components/product/ProductQuickViewModal";
import { ShopBreadcrumbs } from "@/components/shop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { formatPrice } from "@/lib/utils";

export interface ProductDetailViewProps {
  productId: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const product = PRODUCTS.find(
    (p) => p.id === productId || p.slug === productId
  );

  if (!product) {
    notFound();
  }

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  // Interactive local states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "additional" | "reviews"
  >("description");

  // Review submission state
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<ProductReview[]>(
    product.reviewsList || [
      {
        id: "r1",
        userName: "Kristin Watson",
        userAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        date: "2 mins ago",
        comment:
          "Duis at ullamcorper nulla, eu dictum eros. Sed at diam lacus. Morbi eget pulvinar nunc. Sed et dolor at.",
      },
    ]
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev: ProductReview = {
      id: `r-${Date.now()}`,
      userName: "You",
      userAvatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      rating: newReviewRating,
      date: "Just now",
      comment: newReviewText.trim(),
    };

    setLocalReviews([newRev, ...localReviews]);
    setNewReviewText("");
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // Related products from same category or list
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 4);

  const displayRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="w-full bg-white pb-20">
      {/* 1. Breadcrumbs */}
      <ShopBreadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          {
            label: product.category,
            href: `/shop?category=${encodeURIComponent(product.category)}`,
          },
          { label: product.name },
        ]}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Main Product Info & Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
              {product.discountPercentage ? (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="sale" size="md">
                    Sale {product.discountPercentage}%
                  </Badge>
                </div>
              ) : null}

              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 shrink-0 cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-100 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy-Box & Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-sans tracking-tight">
                  {product.name}
                </h1>
                <Badge
                  variant={product.inStock ? "inStock" : "outOfStock"}
                  size="sm"
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Rating & SKU */}
              <div className="flex items-center gap-4 text-xs">
                <RatingStars
                  rating={product.rating}
                  reviewCount={localReviews.length}
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 font-medium">
                  SKU: <strong className="text-gray-800">ECO-{product.id}</strong>
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-extrabold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                {product.discountPercentage ? (
                  <span className="text-xs font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                    {product.discountPercentage}% Off
                  </span>
                ) : null}
              </div>
            </div>

            {/* Short Narrative */}
            <p className="text-sm text-gray-600 font-body leading-relaxed border-t border-gray-100 pt-4">
              {product.description}
            </p>

            {/* Stepper, Add to Cart & Wishlist */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                size="md"
              />

              <Button
                variant="primary"
                size="md"
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] justify-center shadow-sm"
                leftIcon={
                  isAddedToCart ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )
                }
              >
                {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
              </Button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? "bg-danger text-white border-danger"
                    : "border-gray-200 text-gray-700 hover:text-primary hover:border-primary"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Meta Tags & Sharing */}
            <div className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600 font-body">
              <p>
                <span className="font-semibold text-gray-900">Category:</span>{" "}
                <Link
                  href={`/shop?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-primary transition-colors"
                >
                  {product.category}
                </Link>
              </p>
              {product.additionalInfo?.tags && (
                <p>
                  <span className="font-semibold text-gray-900">Tags:</span>{" "}
                  {product.additionalInfo.tags.join(", ")}
                </p>
              )}
              <div className="flex items-center gap-2 pt-2">
                <span className="font-semibold text-gray-900 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" />
                  Share item:
                </span>
                <span className="text-gray-400">Facebook, Twitter, Pinterest, Instagram</span>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 text-xs font-medium text-gray-700">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Free delivery over $50</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 text-xs font-medium text-gray-700">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>100% Organic certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tabbed Content: Descriptions, Additional Info, Reviews (Figma 10, 11, 12) */}
        <div className="border border-gray-100 rounded-2xl bg-white shadow-xs overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex items-center justify-center sm:justify-start border-b border-gray-100 bg-gray-50/50 px-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Descriptions
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("additional")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "additional"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Additional Information
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              Customer Feedback ({localReviews.length})
            </button>
          </div>

          {/* Tab 1: Descriptions (Frame 10) */}
          {activeTab === "description" && (
            <div className="p-6 sm:p-10 space-y-6 animate-in fade-in duration-200">
              <p className="text-sm text-gray-600 font-body leading-relaxed">
                {product.description} Sed feugiat elit ac metus scelerisque
                lobortis. Integer semper, magna sit amet sodales aliquet, nisl
                eros posuere nulla, a malesuada leo leo sit amet nisl. Proin
                aliquam magna ut est posuere, vel dignissim justo pulvinar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>100% Organic certified natural harvest</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Fresh daily delivery directly from verified farms</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Free of synthetic pesticides and fertilizers</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Eco-friendly biodegradable packaging</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Additional Information (Frame 11) */}
          {activeTab === "additional" && (
            <div className="p-6 sm:p-10 animate-in fade-in duration-200">
              <div className="max-w-2xl border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-3 p-3.5 bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Weight:</span>
                  <span className="col-span-2 text-gray-600">
                    {product.additionalInfo?.weight || "01 kg"}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3.5">
                  <span className="font-semibold text-gray-900">Color:</span>
                  <span className="col-span-2 text-gray-600">
                    {product.additionalInfo?.color || "Natural"}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Type:</span>
                  <span className="col-span-2 text-gray-600">
                    {product.additionalInfo?.type || "Organic Fresh Produce"}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3.5">
                  <span className="font-semibold text-gray-900">Category:</span>
                  <span className="col-span-2 text-gray-600">
                    {product.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3.5 bg-gray-50/50">
                  <span className="font-semibold text-gray-900">Stock Status:</span>
                  <span className="col-span-2 text-gray-600 font-medium text-primary">
                    {product.inStock ? "Available in Stock" : "Currently Out of Stock"}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3.5">
                  <span className="font-semibold text-gray-900">Tags:</span>
                  <span className="col-span-2 text-gray-600">
                    {product.additionalInfo?.tags?.join(", ") || "Organic, Fresh, Healthy"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Customer Feedback (Frame 12) */}
          {activeTab === "reviews" && (
            <div className="p-6 sm:p-10 space-y-10 animate-in fade-in duration-200">
              {/* Existing Reviews List */}
              <div className="space-y-6">
                <h4 className="text-base font-bold text-gray-900 font-sans">
                  Recent Reviews
                </h4>
                <div className="divide-y divide-gray-100">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="py-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-sm font-bold text-gray-900 block leading-tight">
                              {rev.userName}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {rev.date}
                            </span>
                          </div>
                        </div>
                        <RatingStars rating={rev.rating} size="sm" showCountText={false} />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 font-body leading-relaxed pl-12">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leave a Review Form */}
              <div className="border-t border-gray-100 pt-8 space-y-4">
                <h4 className="text-base font-bold text-gray-900 font-sans">
                  Leave a Review
                </h4>
                {reviewSubmitted && (
                  <div className="p-3 bg-primary-tint border border-primary-soft text-primary text-xs font-semibold rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thank you! Your feedback has been published.</span>
                  </div>
                )}
                <form onSubmit={handleAddReview} className="space-y-4 max-w-xl">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-gray-700 block">
                      Your Rating:
                    </span>
                    <RatingStars
                      rating={newReviewRating}
                      size="md"
                      interactive
                      onRate={setNewReviewRating}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="review-comment"
                      className="text-xs font-semibold text-gray-700 block"
                    >
                      Write your review:
                    </label>
                    <textarea
                      id="review-comment"
                      rows={4}
                      required
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your experience with this organic product..."
                      className="w-full p-3 text-xs sm:text-sm text-gray-900 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
                    />
                  </div>
                  <Button variant="primary" size="sm" type="submit">
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* 4. Related Products Row */}
        <section className="space-y-6 pt-6" aria-label="Related Products">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">
              Related Products
            </h2>
            <Link
              href="/shop"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {displayRelated.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      </div>

      {/* Quick View Modal */}
      <ProductQuickViewModal />
    </div>
  );
};
