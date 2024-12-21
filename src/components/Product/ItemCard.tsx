import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ProductType } from '@/type/ProductType'
import Rate from '@/components/Other/Rate'
import { Swiper, SwiperSlide } from 'swiper/react';
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
import ModalSizeguide from '@/components/Modal/ModalSizeguide'
import { addCartItem } from '@/services/CartService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    product: ProductType
}

const ItemCard: React.FC<Props> = ({ product }) => {
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

    const { user } = useAuth()

    const [quality, setQuality] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

    useEffect(() => {
        console.log(quality, selectedVariant)
    }, [selectedVariant] )

    const handleIncreaseQuantity = () => {
        setQuality(quality + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quality > 1) {
            setQuality(quality - 1);
        }
    };

    const handleSwiper = (swiper: SwiperCore) => {
        setThumbsSwiper(swiper);
    };

    const handleAddToCart = async () => {
        try{
            const cartItem = {
                product_variant_id: selectedVariant,
                quantity: quality,
                // customer_id: user?.userId
                customer_id: '0f20620b-141a-4416-8831-9560d5bb954a'
            }

            console.log('cartItem: ', cartItem)

            const response = await addCartItem(cartItem)

            toast.success('Item added to cart successfully!');

            setQuality(1)
            setSelectedVariant(null)
        } catch(error) {
            console.log('Failed to add to cart: ', error)
            toast.error('Failed to add item to cart.');
        }
        // openModalCart()
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString("en-LK", {
          style: "currency",
          currency: "LKR",
          minimumFractionDigits: 0,
        });
      };

    return (
        <>
            <div className="list-img md:w-1/2 md:pr-[45px] w-full">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Thumbs]}
                    className="mySwiper2 rounded-2xl overflow-hidden"
                >
                    {product.images.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            onClick={() => {
                                swiperRef.current?.slideTo(index);
                                setOpenPopupImg(true)
                            }}
                        >
                            <Image
                                src={item.imageUrl}
                                width={1000}
                                height={1000}
                                alt='prd-img'
                                className='w-full aspect-[3/4] object-cover'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={(swiper) => {
                        handleSwiper(swiper)
                    }}
                    spaceBetween={0}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {product.images.map((item, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            <Image
                                src={item.imageUrl}
                                width={1000}
                                height={1000}
                                alt='prd-img'
                                className='w-full aspect-[3/4] object-cover rounded-xl'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={`popup-img ${openPopupImg ? 'open' : ''}`}>
                    <span
                        className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                        onClick={() => {
                            setOpenPopupImg(false)
                        }}
                    >
                        <Icon.X className="text-3xl text-white" />
                    </span>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        modules={[Navigation, Thumbs]}
                        navigation={true}
                        loop={true}
                        className="popupSwiper"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                    >
                        {product.images.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                onClick={() => {
                                    setOpenPopupImg(false)
                                }}
                            >
                                <Image
                                    src={item.imageUrl}
                                    width={1000}
                                    height={1000}
                                    alt='prd-img'
                                    className='w-full aspect-[3/4] object-cover rounded-xl'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                <div className="flex justify-between">
                    <div>
                        <div className="caption2 text-secondary font-semibold uppercase">{product.category.categoryName}</div>
                        <div className="heading4 mt-1">{product.productName}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                    <div className='desc text-secondary mt-3'>{product.description}</div>
                    <div className='desc text-secondary mt-2'>Specifications</div>
                    <div className='desc text-secondary'>{product.specification}</div>
                </div>
                <div className="list-action mt-6">
                    <div className="choose-color">
                        <div className="text-title">Variants: </div>
                        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                            {product.variants.map((variant, index) => (
                                <div
                                    className={`rounded-xl p-3 border ${selectedVariant === variant.id ? 'border-black' : 'border-outline'}`}
                                    key={index}
                                    onClick={() => { setSelectedVariant(variant.id) }}
                                >
                                    {
                                        variant.attributes.map((variant_attribute, index) => (
                                            <div key={index}>{variant_attribute.name} : {variant_attribute.value}</div>
                                        ))
                                    }
                                    <div>{formatPrice(variant.price)}</div>
                                    <div>In-stock : {variant.stock}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-title mt-5">Quantity:</div>
                    <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                        <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                            <Icon.Minus
                                size={20}
                                onClick={handleDecreaseQuantity}
                                className={`${product.quantityPurchase === 1 ? 'disabled' : ''} cursor-pointer`}
                            />
                            <div className="body1 font-semibold">{quality}</div>
                            <Icon.Plus
                                size={20}
                                onClick={handleIncreaseQuantity}
                                className='cursor-pointer'
                            />
                        </div>
                        <div onClick={handleAddToCart} className="button-main w-full text-center bg-white text-black border border-black">Add To Cart</div>
                    </div>
                    <div className="button-block mt-5">
                        <div className="button-main w-full text-center">Buy It Now</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ItemCard
