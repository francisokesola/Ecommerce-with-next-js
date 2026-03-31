"use client"
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
    product: Stripe.Product;
}

const ProductCard = ({product}: Props) => {
    const price = product.default_price as Stripe.Price
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price?.unit_amount ? price.unit_amount / 100 : 0,
            imageUrl: product.images?.[0] ?? null,
            quantity: 1,
            description: product.description ?? null,
        });
    };

    return <>
        <Link href={`/products/${product.id}`} className="block h-full">
            <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">

                {product.images && product.images[0] && (
                    <div className='relative h-32 sm:h-36 md:h-44 lg:h-60 w-full'>
                        <Image alt={product.name}
                            src={product.images[0]}
                            fill
                            className='transition-opacity duration-500 ease-in-out object-cover'
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="eager"
                        />
                    </div>
                )}

                <CardHeader className="p-2 sm:p-3 md:p-4">
                    <CardTitle className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-800 line-clamp-1">
                        {product.name}
                    </CardTitle>
                    <CardContent className="p-0 grow flex flex-col justify-between gap-1 sm:gap-2">
                        {product.description && (
                            <p className="text-gray-600 text-xs mb-1 font-medium line-clamp-2">{product.description}</p>
                        )}

                        {price && price.unit_amount &&
                            <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                                ${(price.unit_amount / 100).toFixed(2)}
                            </p>}

                        <Button className="mt-1 sm:mt-2 md:mt-4 bg-black text-white text-xs h-7 sm:h-8 lg:h-9">
                            View Details
                        </Button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            handleAddToCart()
                        }}
                            className="w-full bg-black text-white py-1 sm:py-1.5 md:py-2 rounded hover:bg-gray-800 transition text-xs mt-1"
                        >
                            Add to Cart
                        </button>
                    </CardContent>
                </CardHeader>
            </Card>
        </Link>
    </>
};

export default ProductCard;