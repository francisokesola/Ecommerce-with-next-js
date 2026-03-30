"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
      description: null,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-start md:items-center">
        
        {/* Image */}
        {product.images && product.images[0] && (
          <div className="relative w-full md:w-1/2 lg:w-1/2">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[480px] w-full rounded-lg overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="transition duration-300 hover:opacity-90 object-cover"
              />
            </div>
          </div>
        )}

        {/* Details */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-4 lg:gap-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

          {price && price.unit_amount && (
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={() => removeItem(product.id)}
              className="w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg flex items-center justify-center"
            >
              –
            </Button>
            <span className="text-base sm:text-lg font-medium w-6 text-center">
              {quantity}
            </span>
            <Button
              variant="default"
              onClick={onAddItem}
              className="w-9 h-9 sm:w-10 sm:h-10 text-base sm:text-lg flex items-center justify-center"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};