'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import productData from '@/data/Product.json'
import { ProductType } from '@/type/ProductType';
import { useModalCartContext } from '@/context/ModalCartContext'
import { useCart } from '@/context/CartContext'
import { countdownTime } from '@/store/countdownTime'
import CountdownTimeType from '@/type/CountdownType';
import { AuthContext } from '@/context/AuthContext';
import { getCartItems } from '@/services/CartService';

const ModalCart = ({ serverTimeLeft }: { serverTimeLeft: CountdownTimeType }) => {
    const [timeLeft, setTimeLeft] = useState(serverTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const [activeTab, setActiveTab] = useState<string | undefined>('')
    const { isModalOpen, closeModalCart } = useModalCartContext();
    const { cartState, addToCart, removeFromCart, updateCart } = useCart()

    useEffect(() => {
        if (isModalOpen) {
            fetchCart();
        }
    }, [isModalOpen]);

    let [totalCart, setTotalCart] = useState<number>(0)

    cartState.cartArray.map(item => totalCart += item.price * item.quantity)

    const [cartItems, setCartItems] = useState<any[]>([])

    const fetchCart = async () => {
        try {
            const res = await getCartItems('0f20620b-141a-4416-8831-9560d5bb954a');
            console.log(res);

            let total = 0;
            res.data.forEach((item: any) => {
                total += item.variantDetails.price * item.quantity;
            });
            setTotalCart(total);
            setCartItems(res.data);
        } catch (error) {
            console.log('Failed to fetch cart data: ', error)
        }
    }

    const formatPrice = (price: number) => {
        return price.toLocaleString("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        });
    };

    return (
        <>
            <div className={`modal-cart-block `} onClick={closeModalCart}>
                <div
                    className={`modal-cart-main flex ${isModalOpen ? 'open' : ''} `}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="right cart-block w-full py-6 relative overflow-hidden">
                        <div className="heading px-6 pb-3 flex items-center justify-between relative">
                            <div className="heading5"> Cart  </div>
                            <div
                                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                onClick={closeModalCart}
                            >
                                <Icon.X size={14} />
                            </div>
                        </div>
                        <div className="list-product">
                            {cartItems && cartItems.map((product: any) => (
                                <div key={product.id} className='item py-5 ml-8 flex items-center justify-between gap-3 border-b border-line'>
                                    <div className="infor flex items-center gap-3 w-full">
                                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={product.variantDetails.product.images[0].imageUrl}
                                                width={300}
                                                height={300}
                                                className='w-full h-full'
                                                alt="product"
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="name text-button">{product.variantDetails.product.productName}</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-3 w-full">
                                                {/* <div className="flex items-center text-secondary2 capitalize">
                                                    {product.variantDetails.size}/{product.variantDetails.color}
                                                </div> */}
                                                <div className="product-price text-title">{formatPrice(product.variantDetails.price)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
                            <div className="flex items-center justify-between pt-6 px-6">
                                <div className="heading5">Subtotal</div>
                                <div className="heading5">{formatPrice(totalCart)}</div>
                            </div>
                            <div className="block-button text-center p-6">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={'/checkout'}
                                        className='button-main w-full text-center uppercase'
                                        onClick={closeModalCart}
                                    >
                                        Check Out
                                    </Link>
                                </div>
                                <div onClick={closeModalCart} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Or continue shopping</div>
                            </div>
                            <div className={`tab-item note-block ${activeTab === 'note' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.NotePencil className='text-xl' />
                                        <div className="caption1">Note</div>
                                    </div>
                                </div>
                                <div className="form pt-4 px-6">
                                    <textarea name="form-note" id="form-note" rows={4} placeholder='Add special instructions for your order...' className='caption1 py-3 px-4 bg-surface border-line rounded-md w-full'></textarea>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Save</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div>
                            </div>
                            <div className={`tab-item note-block ${activeTab === 'shipping' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.Truck className='text-xl' />
                                        <div className="caption1">Estimate shipping rates</div>
                                    </div>
                                </div>
                                <div className="form pt-4 px-6">
                                    {/* <div className="">
                                        <label htmlFor='select-country' className="caption1 text-secondary">Country/region</label>
                                        <div className="select-block relative mt-2">
                                            <select
                                                id="select-country"
                                                name="select-country"
                                                className='w-full py-3 pl-5 rounded-xl bg-white border border-line'
                                                defaultValue={'Country/region'}
                                            >
                                                <option value="Country/region" disabled>Country/region</option>
                                                <option value="France">France</option>
                                                <option value="Spain">Spain</option>
                                                <option value="UK">UK</option>
                                                <option value="USA">USA</option>
                                            </select>
                                            <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-5 right-2' />
                                        </div>
                                    </div> */}
                                    <div className="mt-3">
                                        <label htmlFor='select-state' className="caption1 text-secondary">Province</label>
                                        <div className="select-block relative mt-2">
                                            <select
                                                id="select-state"
                                                name="select-state"
                                                className='w-full py-3 pl-5 rounded-xl bg-white border border-line'
                                                defaultValue={'State'}
                                            >
                                                {/* <option value="State" disabled>State</option>
                                                <option value="Paris">Paris</option>
                                                <option value="Madrid">Madrid</option>
                                                <option value="London">London</option>
                                                <option value="New York">New York</option> */}
                                            </select>
                                            <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-5 right-2' />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor='select-code' className="caption1 text-secondary">Postal/Zip Code</label>
                                        <input className="border-line px-5 py-3 w-full rounded-xl mt-3" id="select-code" type="text" placeholder="Postal/Zip Code" />
                                    </div>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Calculator</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div>
                            </div>
                            <div className={`tab-item note-block ${activeTab === 'coupon' ? 'active' : ''}`}>
                                <div className="px-6 py-4 border-b border-line">
                                    {/* <div className="item flex items-center gap-3 cursor-pointer">
                                        <Icon.Tag className='text-xl' />
                                        <div className="caption1">Add A Coupon Code</div>
                                    </div> */}
                                </div>
                                {/* <div className="form pt-4 px-6">
                                    <div className="">
                                        <label htmlFor='select-discount' className="caption1 text-secondary">Enter Code</label>
                                        <input className="border-line px-5 py-3 w-full rounded-xl mt-3" id="select-discount" type="text" placeholder="Discount code" />
                                    </div>
                                </div>
                                <div className="block-button text-center pt-4 px-6 pb-6">
                                    <div className='button-main w-full text-center' onClick={() => setActiveTab('')}>Apply</div>
                                    <div onClick={() => setActiveTab('')} className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block">Cancel</div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCart