'use client'
import React, { useState } from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'

const PaymentOption = () => {
    const searchParams = useSearchParams()
    const discount = searchParams.get('discount')
    const ship = searchParams.get('ship')

    const { cartState } = useCart()
    let [totalCart, setTotalCart] = useState<number>(0)
    const [activePayment, setActivePayment] = useState<string>('credit-card')

    // Calculate the total cart value
    cartState.cartArray.forEach(item => totalCart += item.price * item.quantity)

    const handlePayment = (item: string) => {
        setActivePayment(item)
    }

    return (
        <>
            <div className="information mt-5">
                <div className="form-checkout mt-5">
                    <form>
                        <div className="payment-block md:mt-10 mt-6">
                            <div className="heading5">Choose payment Option:</div>
                            <div className="list-payment mt-5">
                                <div className={`type bg-surface p-5 border border-line rounded-lg ${activePayment === 'credit-card' ? 'open' : ''}`}>
                                    <input className="cursor-pointer" type="radio" id="credit" name="payment" checked={activePayment === 'credit-card'} onChange={() => handlePayment('credit-card')} />
                                    <label className="text-button pl-2 cursor-pointer" htmlFor="credit">Credit Card</label>
                                    <div className="infor">
                                        <div className="text-on-surface-variant1 pt-4">Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</div>
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                <label htmlFor="cardNumberCredit">Card Numbers</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="cardNumberCredit" placeholder="ex.1234567290" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="dateCredit">Date</label>
                                                <input className="border-line px-4 py-3 w-full rounded mt-2" type="date" id="dateCredit" name="date" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="ccvCredit">CCV</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="ccvCredit" placeholder="****" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input type="checkbox" id="saveCredit" name="save" />
                                            <label className="text-button" htmlFor="saveCredit">Save Card Details</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activePayment === 'cash-delivery' ? 'open' : ''}`}>
                                    <input className="cursor-pointer" type="radio" id="delivery" name="payment" checked={activePayment === 'cash-delivery'} onChange={() => handlePayment('cash-delivery')} />
                                    <label className="text-button pl-2 cursor-pointer" htmlFor="delivery">Cash on delivery</label>
                                    <div className="infor">
                                        <div className="text-on-surface-variant1 pt-4">Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</div>
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                {/* <div className="bg-img"><Image src="assets/images/component/payment.png" alt="" /></div> */}
                                                <label htmlFor="cardNumberDelivery">Card Numbers</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="cardNumberDelivery" placeholder="ex.1234567290" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="dateDelivery">Date</label>
                                                <input className="border-line px-4 py-3 w-full rounded mt-2" type="date" id="dateDelivery" name="date" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="ccvDelivery">CCV</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="ccvDelivery" placeholder="****" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input type="checkbox" id="saveDelivery" name="save" />
                                            <label className="text-button" htmlFor="saveDelivery">Save Card Details</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activePayment === 'apple-pay' ? 'open' : ''}`}>
                                    <input className="cursor-pointer" type="radio" id="apple" name="payment" checked={activePayment === 'apple-pay'} onChange={() => handlePayment('apple-pay')} />
                                    <label className="text-button pl-2 cursor-pointer" htmlFor="apple">Apple Pay</label>
                                    <div className="infor">
                                        <div className="text-on-surface-variant1 pt-4">Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</div>
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                {/* <div className="bg-img"><Image src="assets/images/component/payment.png" alt="" /></div> */}
                                                <label htmlFor="cardNumberApple">Card Numbers</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="cardNumberApple" placeholder="ex.1234567290" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="dateApple">Date</label>
                                                <input className="border-line px-4 py-3 w-full rounded mt-2" type="date" id="dateApple" name="date" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="ccvApple">CCV</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="ccvApple" placeholder="****" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input type="checkbox" id="saveApple" name="save" />
                                            <label className="text-button" htmlFor="saveApple">Save Card Details</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activePayment === 'paypal' ? 'open' : ''}`}>
                                    <input className="cursor-pointer" type="radio" id="paypal" name="payment" checked={activePayment === 'paypal'} onChange={() => handlePayment('paypal')} />
                                    <label className="text-button pl-2 cursor-pointer" htmlFor="paypal">PayPal</label>
                                    <div className="infor">
                                        <div className="text-on-surface-variant1 pt-4">Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</div>
                                        <div className="row">
                                            <div className="col-12 mt-3">
                                                <label htmlFor="cardNumberPaypal">Card Numbers</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="cardNumberPaypal" placeholder="ex.1234567290" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="datePaypal">Date</label>
                                                <input className="border-line px-4 py-3 w-full rounded mt-2" type="date" id="datePaypal" name="date" />
                                            </div>
                                            <div className=" mt-3">
                                                <label htmlFor="ccvPaypal">CCV</label>
                                                <input className="cursor-pointer border-line px-4 py-3 w-full rounded mt-2" type="text" id="ccvPaypal" placeholder="****" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input type="checkbox" id="savePaypal" name="save" />
                                            <label className="text-button" htmlFor="savePaypal">Save Card Details</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default PaymentOption
