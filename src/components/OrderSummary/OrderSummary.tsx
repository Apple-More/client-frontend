'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { countdownTime } from '@/store/countdownTime';

const OrderSummary = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();
    const { cartState } = useCart();
    
    const [totalCart, setTotalCart] = useState(0);
    const [discountCart, setDiscountCart] = useState(0);
    const [shipCart, setShipCart] = useState(30);
    const [applyCode, setApplyCode] = useState(0);

    const moneyForFreeship = 150; // Added to define the free shipping threshold

    // Calculate total cart value
    useEffect(() => {
        const total = cartState.cartArray.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalCart(total);

        // Reset discounts and shipping if conditions are not met
        if (total < applyCode) {
            setApplyCode(0);
            setDiscountCart(0);
        }
        setShipCart(total < moneyForFreeship ? 30 : 0);
    }, [cartState, applyCode]);

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
        <>
            <div className="heading5">Order Summary</div>
            <div className="total-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Subtotal</div>
                <div className="text-title">$<span className="total-product">{totalCart}</span>.00</div>
            </div>
            <div className="discount-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Discounts</div>
                <div className="text-title">-$<span className="discount">{discountCart}</span>.00</div>
            </div>
            <div className="ship-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Shipping</div>
                <div className="choose-type flex gap-12">
                    <div className="left">
                        <div className="type">
                            <input
                                id="free-shipping"
                                type="radio"
                                name="ship"
                                disabled={moneyForFreeship - totalCart > 0}
                                checked={shipCart === 0}
                                onChange={() => setShipCart(0)}
                            />
                            <label className="pl-1" htmlFor="free-shipping">Free Shipping:</label>
                        </div>
                        <div className="type mt-1">
                            <input
                                id="local"
                                type="radio"
                                name="ship"
                                value={30}
                                checked={shipCart === 30}
                                onChange={() => setShipCart(30)}
                            />
                            <label className="text-on-surface-variant1 pl-1" htmlFor="local">Local:</label>
                        </div>
                        <div className="type mt-1">
                            <input
                                id="flat"
                                type="radio"
                                name="ship"
                                value={40}
                                checked={shipCart === 40}
                                onChange={() => setShipCart(40)}
                            />
                            <label className="text-on-surface-variant1 pl-1" htmlFor="flat">Flat Rate:</label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="ship">$0.00</div>
                        <div className="local text-on-surface-variant1 mt-1">$30.00</div>
                        <div className="flat text-on-surface-variant1 mt-1">$40.00</div>
                    </div>
                </div>
            </div>
            <div className="total-cart-block pt-4 pb-4 flex justify-between">
                <div className="heading5">Total</div>
                <div className="heading5">$<span className="total-cart">{totalCart - discountCart + shipCart}</span>.00</div>
            </div>
            <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                <button
                    className="checkout-btn button-main text-center w-full"
                    onClick={redirectToCheckout}
                >
                    Process To Checkout
                </button>
                <Link className="text-button hover-underline" href="/shop/breadcrumb1">
                    Continue shopping
                </Link>
            </div>
        </>
    );
};

export default OrderSummary;
