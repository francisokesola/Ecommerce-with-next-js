"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";

const CartIcon = () => {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/checkout" className="relative inline-flex items-center">
      <ShoppingCart className="h-6 w-6" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;