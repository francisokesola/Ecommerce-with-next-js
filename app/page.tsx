import {stripe} from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/carousel";
import {ProductList} from "@/components/Product-list";

export default async function Home() {

  const products = await stripe.products.list(
    {expand: ["data.default_price"],
      limit: 5,
    } 
  );

  return (
    <div>
      <section className="bg-gray-300 py-2">

        <Image
            src="/winter-is-here/public/Elegant luxury watch close-up.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 justify-between px-6 sm:px-12 md:px-20 lg:px-28 my-10 md:my-16 lg:my-20">
          
          <div className="grid gap-4 items-center text-center md:text-left">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">Welcome to Classic Watches
            </h1>
            <p className="text-sm sm:text-base">Discover the available classic watches</p>
            <Button variant="default">
              <Link href="/products" className="text-white items-center inline-flex rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
                Explore now
              </Link>
            </Button>
          </div>

          <Image
            src={products.data[0]?.images[0]}
            alt="Homepage"
            width={450}
            height={450}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md `lg:!w-[550px] `lg:h-[450px] h-auto rounded"
          />

        </div>
      </section>

      <section className="py-6 sm:py-8">
        <Carousel products={products.data} />
      </section>

      <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-6 sm:py-8">
        <ProductList products={products.data.slice(0, 5)} />
        <div className="flex justify-center mt-6">
          <Button variant="default">
            <Link href="/products">View all Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}