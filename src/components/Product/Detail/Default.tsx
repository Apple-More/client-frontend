'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ProductType } from '@/type/ProductType'
import Rate from '@/components/Other/Rate'
import { Navigation, Thumbs, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from 'swiper/core';
import { useCart } from '@/context/CartContext'
import { useModalCartContext } from '@/context/ModalCartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useModalWishlistContext } from '@/context/ModalWishlistContext'
import { useCompare } from '@/context/CompareContext'
import { useModalCompareContext } from '@/context/ModalCompareContext'

import ItemCard from '../ItemCard'


SwiperCore.use([Navigation, Thumbs]);

interface Props {
    product: ProductType
}

const Default: React.FC<Props> = ({ product }) => {
    return (
        <>
            <div className="product-detail default">
                <div className="featured-product underwear md:py-20 py-10">
                    <div className="container flex justify-between gap-y-6 flex-wrap">
                        <ItemCard product={product} />
                        
                    </div>
                    <div className="get-it mt-6 pb-8 border-b border-line ml-28">
                        <div className="heading5">Get it today</div>
                        <div className="item flex items-center gap-3 mt-4">
                            <div className="icon-delivery-truck text-4xl"></div>
                            <div>
                                <div className="text-title">Free shipping</div>
                                <div className="caption1 text-secondary mt-1">Free shipping on orders over LKR 10,000</div>
                            </div>
                        </div>
                        <div className="item flex items-center gap-3 mt-4">
                            <div className="icon-phone-call text-4xl"></div>
                            <div>
                                <div className="text-title">Support everyday</div>
                                <div className="caption1 text-secondary mt-1">Support from 8:30 AM to 8:00 PM everyday</div>
                            </div>
                        </div>
                        <div className="item flex items-center gap-3 mt-4">
                            <div className="icon-return text-4xl"></div>
                            <div>
                                <div className="text-title">14 Day Returns</div>
                                <div className="caption1 text-secondary mt-1">Not impressed? Get a refund. You have 14 days to break our hearts.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="desc-tab md:pb-20 pb-10">
                <div className="container">
                    <div className="desc-block mt-8">
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-10 mt-6">
                            <div className="item">
                                <div className="icon-delivery-truck text-4xl"></div>
                                <div className="heading6 mt-4">Shipping Faster</div>
                                <div className="text-secondary mt-2">All deliveries will be made through fast secure courier service </div>
                            </div>
                            <div className="item">
                                <div className="icon-cotton text-4xl"></div>
                                <div className="heading6 mt-4">Green Initiative</div>
                                <div className="text-secondary mt-2">We aim to reduce our environmental impact though using less plastic in our packages.</div>
                            </div>
                            <div className="item">
                                <div className="icon-guarantee text-4xl"></div>
                                <div className="heading6 mt-4">Warranty</div>
                                <div className="text-secondary mt-2">AppleMore provide genuine Apple Care warranty therefore you can have a peace of mind.</div>
                            </div>
                            <div className="item">
                                <div className="icon-leaves-compatible text-4xl"></div>
                                <div className="heading6 mt-4">Efficient</div>
                                <div className="text-secondary mt-2">We process your orders within 1 to 2 hours during operating hours.</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Default