"use client"
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import CartIcon from '@/components/cart-icon'
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { Button } from '@/components/ui/button'

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {
        const handleOutside = (e: MouseEvent | TouchEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMobileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
        };
    }, []);

    return (
        <>
            <div ref={navRef}>
                <nav className="sticky top-0 z-50 bg-white shadow">
                    <div className="container mx-auto flex items-center justify-between px-6 py-4">
                        <Link href="/" className='font-bold text-2xl' onClick={() => setMobileOpen(false)}>
                            Classic Watches
                        </Link>

                        <div className='hidden md:flex space-x-6'>
                            <Link href="/">Home</Link>
                            <Link href="/products" className='hover:text-blue-600'>Products</Link>
                            <Link href="/checkout" className='hover:text-blue-600'>Checkout</Link>
                        </div>

                        <div className='flex items-center space-x-4'>
                            <CartIcon />
                            <Button onClick={() => setMobileOpen((prev) => !prev)} variant="ghost" className="md:hidden">
                                {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>

                    {mobileOpen && (
                        <div className="md:hidden bg-white shadow-md">
                            <ul className="flex flex-col space-y-2 p-4">
                                <li><Link href="/" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>Home</Link></li>
                                <li><Link href="/products" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>Products</Link></li>
                                <li><Link href="/checkout" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>Checkout</Link></li>
                            </ul>
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}

export default Navbar