"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import CartIcon from '@/components/cart-icon'
import {XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { Button } from '@/components/ui/button'


const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    })

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };
  return (
    <>
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className='font-bold text-2xl'>
                Marstech
                </Link>
            
            <div className='hidden md:flex space-x-6'>
                <Link href="/">Home</Link>
                <Link href="/products" className='hover:text-blue-600'>Products</Link>
                <Link href="/checkout" className='hover:text-blue-600'>Checkout</Link>
            </div>
            <div className='flex items-center space-x-4'>
                 <CartIcon />
                <Button onClick={() => setMobileOpen((prev) => !prev) } variant="ghost" className="md:hidden">
                    {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Button>
            </div>
            </div>

            {mobileOpen && (
                <nav className="md:hidden bg-white shadow-md  ">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li><Link href="/" className="block hover:text-blue-600"> Home</Link></li>
                        <li><Link href="/products" className="block hover:text-blue-600">Products</Link></li>
                        <li><Link href="/checkout" className="block hover:text-blue-600">Checkout</Link></li>
                    </ul>
                </nav>
            )}
        </nav>
    </>
  )
}

export default Navbar