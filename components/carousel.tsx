"use client"

import React, { useEffect, useState } from 'react'
import { Stripe } from "stripe"
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({products}: Props) => {

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)
    }, 3000);
    return () => clearInterval(interval)
  }, [products.length]);

  const currentProduct = products[current]
  const price = currentProduct.default_price as Stripe.Price

  return (
    <Card className='relative overflow-hidden rounded-lg shadow-md border-gray-300'>
      {currentProduct.images && currentProduct.images[0] && (
        <div className='relative h-48 sm:h-64 md:h-72 lg:h-80 w-full'>
          <Image alt={currentProduct.name} src={currentProduct.images[0]} fill className='object-cover transition-opacity duration-500 ease-in-out'/>
        </div>
      )}
      <CardContent className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50'>
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 text-center px-4">
          {currentProduct.name}
          {price && price.unit_amount &&
            <p className="text-base sm:text-lg md:text-xl text-white text-center mt-1">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>}
        </CardTitle>
      </CardContent>
    </Card>
  )
}

export default Carousel