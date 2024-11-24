'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { countdownTime } from '@/store/countdownTime';



const OrderDetails = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();
    const { cartState, updateCart } = useCart();

    const [totalCart, setTotalCart] = useState(0);
    const [discountCart, setDiscountCart] = useState(0);
    const [shipCart, setShipCart] = useState(30);
    const [applyCode, setApplyCode] = useState(0);
    const moneyForFreeship = 150;

    useEffect(() => {
        // Update time left for countdown every second
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Calculate total cart value dynamically
        const total = cartState.cartArray.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalCart(total);

        // Adjust shipping and discount based on totalCart
        if (total < moneyForFreeship) {
            setShipCart(30);
        } else {
            setShipCart(0);
        }

        if (total < applyCode) {
            setApplyCode(0);
            setDiscountCart(0);
        }
    }, [cartState.cartArray, applyCode, moneyForFreeship]);

    const handleQuantityChange = (productId, newQuantity) => {
        const itemToUpdate = cartState.cartArray.find(item => item.id === productId);
        if (itemToUpdate) {
            updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
        }
    };

    const handleApplyCode = (minValue, discount) => {
        if (totalCart >= minValue) {
            setApplyCode(minValue);
            setDiscountCart(discount);
        } else {
            alert(`Minimum order must be $${minValue}`);
        }
    };

    const redirectToCheckout = () => {
        router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`);
    };

    return (
        <OrderSummary
            cartState={cartState}
            discount={discountCart}
            ship={shipCart}
            totalCart={totalCart}
        />
    );
};

const OrderSummary = ({ cartState, discount, ship, totalCart }) => {
    return (
        <div>
            <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                    {cartState.cartArray.length < 1 ? (
                        <p className="text-button pt-3">No product in cart</p>
                    ) : (
                        cartState.cartArray.map(product => (
                            <div
                                key={product.id}
                                className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5"
                            >
                                <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                        src={product.thumbImage[0]}
                                        width={500}
                                        height={500}
                                        alt="img"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <div className="name text-title">{product.name}</div>
                                        <div className="caption1 text-secondary mt-2">
                                            <span className="size capitalize">
                                                {product.selectedSize || product.sizes[0]}
                                            </span>
                                            <span>/</span>
                                            <span className="color capitalize">
                                                {product.selectedColor || product.variation[0].color}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-title">
                                        <span className="quantity">{product.quantity}</span>
                                        <span className="px-1">x</span>
                                        <span>${product.price}.00</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="discount-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Discounts</div>
                    <div className="text-title">-${discount}.00</div>
                </div>
                <div className="ship-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Shipping</div>
                    <div className="text-title">{ship === 0 ? 'Free' : `$${ship}.00`}</div>
                </div>
                <div className="total-cart-block pt-5 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5 total-cart">
                        ${totalCart - discount + ship}.00
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
