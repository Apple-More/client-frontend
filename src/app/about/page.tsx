'use client'
import React from 'react'
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Benefit from '@/components/Home1/Benefit'
import Newsletter from '@/components/Home4/Newsletter'
import Instagram from '@/components/Home6/Instagram'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'

const AboutUs = () => {
    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-white" />
                <Breadcrumb heading='About Us' subHeading='About Us' />
            </div>
            <div className='about md:pt-20 pt-10'>
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <div className="heading3 text-center">Welcome to Applemore, Sri Lanka{String.raw`'s`} premier destination for all the Apple Products!</div>
                                <div className="body1 text-center md:mt-7 mt-5">At Applemore, we believe in bringing the world of Apple closer to you. Our mission is to provide you with a seamless and exceptional shopping experience, whether you are a tech enthusiast, a creative professional, or someone looking for the perfect Apple device for everyday use.</div>
                            </div>
                        </div>
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full pt-20">
                                <div className="heading3 text-center">Who We Are</div>
                                <div className="body1 text-center md:mt-7 mt-5">Applemore is an authorized retailer of Apple products, offering a wide range of the latest devices and accessories, from iPhones and iPads to MacBooks and Apple Watches. With years of experience and a dedicated team of Apple experts, we strive to deliver unmatched customer service and product expertise.</div>
                            </div>
                        </div>
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full pt-20">
                                <div className="heading3 text-center">Our Vision</div>
                                <div className="body1 text-center md:mt-7 mt-5">To be Sri Lanka’s most trusted and innovative Apple retailer, delivering world-class products and services that enhance the lives of our customers.</div>
                            </div>
                            <div className="content md:w-5/6 w-full pt-20">
                                <div className="heading3 text-center">Our Mission</div>
                                <div className="body1 text-center md:mt-7 mt-5">To connect people with the best of Apple technology and provide an outstanding customer experience every step of the way.</div>
                            </div>
                        </div>
                        <div className="list-img grid sm:grid-cols-3 gap-[30px] md:pt-20 pt-10">
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us1.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us2.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                            <div className="bg-img">
                                <Image
                                    src={'/images/other/about-us3.png'}
                                    width={2000}
                                    height={3000}
                                    alt='bg-img'
                                    className='w-full rounded-[30px]'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Benefit props="md:py-20 py-10" />
            <Footer />
        </>
    )
}

export default AboutUs