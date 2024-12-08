'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { countdownTime } from '@/store/countdownTime';
import { AuthContext } from '@/context/AuthContext';
import { getCartItems } from '@/services/CartService';
import { createOrder } from '@/services/OrderServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();

    useEffect(() => {
        // Update time left for countdown every second
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <OrderSummary />
            <ToastContainer />
        </>
    );
};

const OrderSummary = () => {
    const [cartItems, setCartItems] = useState<any[]>([])
    const [totalCart, setTotalCart] = useState(0);

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

    useEffect(() => {
        fetchCart();
    }, []);


    const formatPrice = (price: number) => {
        return price.toLocaleString("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 0,
        });
    };

    const handlePlaceOrder = async () => {
        try{
            const order = {
                order:{
                    customer_id: '0f20620b-141a-4416-8831-9560d5bb954a',
                    shipping_address_id:"ac7d5d1a-762c-451d-97ae-0233a24b279f",
                    order_status: "payment_pending"
                },
                orderItems: cartItems.map((item: any) => ({
                    variantId: item.variantDetails.id,
                    quantity: item.quantity,
                })),
                total: totalCart
            }

            await createOrder(order);
            toast.success('Order placed successfully!');
        } catch (error) {
            console.log('Failed to place order: ', error);
            toast.error('Failed to place order.');
        }
    }

    return (
        <div>
            <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
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
                                    <div className="flex items-center justify-between gap-1 mt-3 w-full">
                                        <div className="">x {product.quantity}</div>
                                        <div className="product-price text-title">{formatPrice(product.variantDetails.price)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="total-cart-block pt-5 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5 total-cart">
                        {formatPrice(totalCart)}.00
                    </div>
                </div>
                <div className="block-button md:mt-10 mt-6">
                    <button className="button-main w-full" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
