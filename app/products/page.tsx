import ProductList from "@/components/Product-list"
import { stripe } from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ProductsPage() {

  const products = await stripe.products.list(
    {
      expand: ["data.default_price"],
    }
  )

  return (
    <div className="pb-8 mt-5 px-4 sm:px-8 lg:px-20">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-none tracking-tight text-foreground text-center mb-6 sm:mb-8">
        All Products
      </h1>
      <ProductList products={products.data} />
      <Button variant="default" className="mt-4 p-2 w-full sm:w-auto">
        <Link href="/checkout">Go to Checkout</Link>
      </Button>
    </div>
  )
}