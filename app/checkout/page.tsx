"use client";

import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import checkoutAction from "./checkout-action";
import { Button } from "@/components/ui/button";


const CheckoutPage = () => {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Your cart is empty</h2>
        <Link href="/products" className="bg-black text-white px-4 sm:px-6 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">Order Summary</h1>

      <div className="flex flex-col gap-3 sm:gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 sm:gap-4 border rounded-lg p-2 sm:p-3">

            {item.imageUrl && (
              <div className="relative h-14 w-14 sm:h-17 sm:w-17 shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-lg truncate">{item.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">${item.description}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Quantity: {item.quantity}</p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-bold text-sm sm:text-base">${(item.price * item.quantity).toFixed(2)}</p>
              <p className="text-gray-400 text-xs">${item.price.toFixed(2)} each</p>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 text-lg sm:text-xl ml-1 sm:ml-2"
            >
              -
            </button>
            <button onClick={() => addItem(item)} className="text-green-500 hover:text-green-700 text-lg sm:text-xl ml-1 sm:ml-2">
              +
            </button>
          </div>
        ))}

        <Link href="/products" className="text-gray-500 hover:text-red-600 text-xs sm:text-sm ml-2 underline w-fit">
          Continue Shopping
        </Link>
      </div>

      <div className="mt-6 sm:mt-8 border-t pt-4 flex justify-between items-center">
        <span className="text-lg sm:text-xl font-bold">Total</span>
        <span className="text-lg sm:text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-4">
        <button
          onClick={clearCart}
          className="border border-red-500 text-red-500 px-4 sm:px-6 py-2 rounded hover:bg-red-50 transition text-sm sm:text-base"
        >
          Clear Cart
        </button>
        <form action={checkoutAction}>
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button variant="default" type="submit" className="bg-black text-white px-4 sm:px-6 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base">
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;