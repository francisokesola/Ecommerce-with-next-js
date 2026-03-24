"use client"
import Link  from "next/link";
import Stripe from "stripe";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";


interface Props {
    product: Stripe.Product ;
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
            <div className='relative h-60 w-full'>
                <Image alt={product.name} 
                src={product.images[0]} 
                fill 
                className='transition-opacity duration-500 ease-in-out object-cover'
                />
            </div>
              )}

              <CardHeader className="p-4">
                <CardTitle  className="text-xl font-bold text-gray-800">
                    {product.name}
                </CardTitle>
                <CardContent  className="p-4 grow flex flex-col justify-between">
                    {product.description && (
                    <p className="text-gray-600 text-sm mb-2 font-medium">{product.description}</p>
                    )}
                    
                    {price && price.unit_amount &&
                     <p className="text-lg font-semibold text-gray-900">
                         ${(price.unit_amount / 100).toFixed(2)}
                     </p>}

                     <Button className="mt-4 bg-black text-white">View Details</Button>
                       <button onClick={(e) => {
                            e.preventDefault()  // ← prevents Link from triggering on button click
                            handleAddToCart()
                            }}
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
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