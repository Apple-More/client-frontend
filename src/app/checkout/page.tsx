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
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
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
                            {/* <div className="checkout-block">
                                <div className="heading5 pb-3">Your Order</div>
                                <div className="list-product-checkout">
                                    {cartState.cartArray.length < 1 ? (
                                        <p className='text-button pt-3'>No product in cart</p>
                                    ) : (
                                        cartState.cartArray.map((product) => (
                                            <>
                                                <div className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                                                    <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={product.thumbImage[0]}
                                                            width={500}
                                                            height={500}
                                                            alt='img'
                                                            className='w-full h-full'
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <div className="name text-title">{product.name}</div>
                                                            <div className="caption1 text-secondary mt-2">
                                                                <span className='size capitalize'>{product.selectedSize || product.sizes[0]}</span>
                                                                <span>/</span>
                                                                <span className='color capitalize'>{product.selectedColor || product.variation[0].color}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-title">
                                                            <span className='quantity'>{product.quantity}</span>
                                                            <span className='px-1'>x</span>
                                                            <span>
                                                                ${product.price}.00
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    )}
                                </div>
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Discounts</div>
                                    <div className="text-title">-$<span className="discount">{discount}</span><span>.00</span></div>
                                </div>
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Shipping</div>
                                    <div className="text-title">{Number(ship) === 0 ? 'Free' : `$${ship}.00`}</div>
                                </div>
                                <div className="total-cart-block pt-5 flex justify-between">
                                    <div className="heading5">Total</div>
                                    <div className="heading5 total-cart">${totalCart - Number(discount) + Number(ship)}.00</div>
                                </div>
                            </div> */}
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