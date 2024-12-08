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
    const swiperRef: any = useRef();
    const [photoIndex, setPhotoIndex] = useState(0)
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [activeColor, setActiveColor] = useState<string>('')
    const [activeSize, setActiveSize] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string | undefined>('description')
    const { addToCart, updateCart, cartState } = useCart()
    const { openModalCart } = useModalCartContext()
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist()
    const { openModalWishlist } = useModalWishlistContext()
    const { addToCompare, removeFromCompare, compareState } = useCompare();
    const { openModalCompare } = useModalCompareContext()

    return (
        <>
            <div className="product-detail default">
                <div className="featured-product underwear md:py-20 py-10">
                    <div className="container flex justify-between gap-y-6 flex-wrap">
                        <ItemCard product={product} />
                        {/* <div className="more-infor mt-6">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Icon.ArrowClockwise className='body1' />
                                            <div className="text-title">Delivery & Return</div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Icon.Question className='body1' />
                                            <div className="text-title">Ask A Question</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <Icon.Timer className='body1' />
                                        <div className="text-title">Estimated Delivery:</div>
                                        <div className="text-secondary">14 January - 18 January</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <Icon.Eye className='body1' />
                                        <div className="text-title">38</div>
                                        <div className="text-secondary">people viewing this product right now!</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">SKU:</div>
                                        <div className="text-secondary">53453412</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Categories:</div>
                                        <div className="text-secondary">{productMain.category}, {productMain.gender}</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Tag:</div>
                                        <div className="text-secondary">{productMain.type}</div>
                                    </div>
                                </div> */}
                        {/* <div className="list-payment mt-7">
                                    <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full">
                                        <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">Guranteed safe checkout</div>
                                        <div className="list grid grid-cols-6">
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-0.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-1.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-2.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-3.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-4.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                            <div className="item flex items-center justify-center lg:px-3 px-1">
                                                <Image
                                                    src={'/images/payment/Frame-5.png'}
                                                    width={500}
                                                    height={450}
                                                    alt='payment'
                                                    className='w-full'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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