import type { CartItem, Coupon } from "@/types";

export const MOCK_COUPONS: Record<string, Coupon> = {
  ECO10: {
    code: "ECO10",
    discountPercent: 10,
    description: "10% off entire order",
  },
  FREESHIP: {
    code: "FREESHIP",
    freeShipping: true,
    description: "Free standard shipping",
  },
  ORGANIC20: {
    code: "ORGANIC20",
    discountPercent: 20,
    minSubtotal: 30,
    description: "20% off orders over $30",
  },
};

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  couponError?: string;
}

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; coupon?: Coupon; error?: string } {
  const normalized = code.trim().toUpperCase();
  const coupon = MOCK_COUPONS[normalized];

  if (!coupon) {
    return { valid: false, error: "Invalid coupon code. Try ECO10, FREESHIP, or ORGANIC20." };
  }

  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      error: `Coupon requires a minimum order of $${coupon.minSubtotal.toFixed(2)}.`,
    };
  }

  return { valid: true, coupon };
}

export function calculateCartTotals(
  items: CartItem[],
  couponCode?: string | null
): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let shipping = 0;
  if (subtotal > 0) {
    shipping = subtotal >= 50 ? 0 : 5.0; // Free over $50, else $5
  }

  let discount = 0;
  let appliedCoupon: Coupon | null = null;
  let couponError: string | undefined = undefined;

  if (couponCode && subtotal > 0) {
    const val = validateCoupon(couponCode, subtotal);
    if (val.valid && val.coupon) {
      appliedCoupon = val.coupon;
      if (val.coupon.freeShipping) {
        shipping = 0;
      }
      if (val.coupon.discountPercent) {
        discount = (subtotal * val.coupon.discountPercent) / 100;
      } else if (val.coupon.discountAmount) {
        discount = Math.min(subtotal, val.coupon.discountAmount);
      }
    } else {
      couponError = val.error;
    }
  }

  const total = Math.max(0, subtotal + shipping - discount);

  return {
    itemCount,
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
    appliedCoupon,
    couponError,
  };
}
