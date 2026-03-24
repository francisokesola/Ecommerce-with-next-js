import {stripe} from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/carousel";
export default async function Home() {

  const products = await stripe.products.list(
    {expand: ["data.default_price"],
      limit: 5,
    } 
  )

  
  ;
  return (
         <div>
            <section className=" bg-gray-300 py-2" >
            
            <div className="flex flex-row items-center  gap-10  justify-between mx-28 my-20 ">
              <div className="grid gap-4 top-20 items-center text-left justify-center">
                <h1 className="font-bold text-2xl">Welcome to MarsTech</h1>
                <p>Discover the available classic watches</p>
                <Button variant="default" >
                  <Link href="/products" className="text-white items-center inline-flex rounded-full px-6 py-3">Explore now</Link>
                </Button>
              </div>
              <Image src={products.data[0]?.images[0]} alt="Homepage"  width={450} height={450} className="!w-[550px] h-[450px] rounded" />
            </div>
            </section>
            <section className="py-8">
              <Carousel products={products.data} />
            </section>
         </div>
   
   
  )
}