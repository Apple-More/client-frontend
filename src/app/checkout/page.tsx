'use client'
import React, { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
// import { ProductType } from '@/type/ProductType'
// import productData from '@/data/Product.json'
// import Product from '@/components/Product/Product'
// import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation';
import OrderDetails from '@/components/OrderDetails/OrderDetails'
import PaymentOption from '@/components/PaymentOption/PaymentOption'

const Checkout = () => {
    const searchParams = useSearchParams()
    // let discount = searchParams.get('discount')
    // let ship = searchParams.get('ship')

    const { cartState } = useCart();
    let [totalCart, setTotalCart] = useState<number>(0)
    // const [activePayment, setActivePayment] = useState<string>('credit-card')

    cartState.cartArray.map(item => totalCart += item.price * item.quantity)

    // const handlePayment = (item: string) => {
    //     setActivePayment(item)
    // }

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between">
                        <div className="left w-1/2">
                           <PaymentOption/>
                        </div>
                        <div className="right w-5/12">
                            <OrderDetails/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout