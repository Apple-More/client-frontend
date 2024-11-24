'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useCart } from '@/context/CartContext'
import { countdownTime } from '@/store/countdownTime'

const Cart = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();
    const { cartState, updateCart, removeFromCart } = useCart();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        const itemToUpdate = cartState.cartArray.find(item => item.id === productId);
        if (itemToUpdate) {
            updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
        }
    };

    let moneyForFreeship = 150;
    let [totalCart, setTotalCart] = useState(0);
    let [discountCart, setDiscountCart] = useState(0);
    let [shipCart, setShipCart] = useState(30);
    let [applyCode, setApplyCode] = useState(0);

    cartState.cartArray.forEach(item => totalCart += item.price * item.quantity);

    const handleApplyCode = (minValue, discount) => {
        if (totalCart > minValue) {
            setApplyCode(minValue);
            setDiscountCart(discount);
        } else {
            alert(`Minimum order must be ${minValue}$`);
        }
    };

    if (totalCart < applyCode) {
        applyCode = 0;
        discountCart = 0;
    }
    if (totalCart < moneyForFreeship) shipCart = 30;
    if (cartState.cartArray.length === 0) shipCart = 0;

    const redirectToCheckout = () => {
        router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`);
    };

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
                        <div className="xl:w-2/3 xl:pr-3 w-full">
                            <div className="list-product w-full sm:mt-7 mt-5">
                                <div className="w-full">
                                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                                        <div className="flex">
                                            <div className="w-1/2 text-button text-center">Products</div>
                                            <div className="w-1/12 text-button text-center">Price</div>
                                            <div className="w-1/6 text-button text-center">Quantity</div>
                                            <div className="w-1/6 text-button text-center">Total Price</div>
                                        </div>
                                    </div>
                                    <div className="list-product-main w-full mt-3">
                                        {cartState.cartArray.length < 1 ? (
                                            <p className="text-button pt-3">No product in cart</p>
                                        ) : (
                                            cartState.cartArray.map(product => (
                                                <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
                                                    <div className="w-1/2 flex items-center gap-6">
                                                        <Image
                                                            src={product.thumbImage[0]}
                                                            width={1000}
                                                            height={1000}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <div>
                                                            <div className="text-title">{product.name}</div>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/12 text-title text-center">${product.price}.00</div>
                                                    <div className="w-1/6 flex items-center justify-center">
                                                        <div className="quantity-block bg-surface p-3 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                                                            <Icon.Minus
                                                                onClick={() => {
                                                                    if (product.quantity > 1) {
                                                                        handleQuantityChange(product.id, product.quantity - 1);
                                                                    }
                                                                }}
                                                                className={`text-base ${product.quantity === 1 ? 'disabled' : ''}`}
                                                            />
                                                            <div className="text-button quantity">{product.quantity}</div>
                                                            <Icon.Plus
                                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                                                className="text-base"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/6 text-title text-center">${product.quantity * product.price}.00</div>
                                                    <div className="w-1/12">
                                                        <Icon.XCircle
                                                            className="text-xl text-red cursor-pointer hover:text-black duration-500"
                                                            onClick={() => removeFromCart(product.id)}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
};

export default Cart;
