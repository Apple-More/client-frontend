import React from 'react'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace'
import SliderMarketplace from '@/components/Slider/SliderMarketplace'
import BannerAbove from '@/components/Marketplace/BannerAbove'
import productData from '@/data/Product.json'
import Benefit from '@/components/Home1/Benefit'
import blogData from '@/data/Blog.json'
import Brand from '@/components/Home1/Brand'
import Footer from '@/components/Footer/Footer'
import ModalNewsletter from '@/components/Modal/ModalNewsletter'
import Deal from '@/components/Marketplace/Deal'
import Collection from '@/components/Marketplace/Collection'
import BestSeller from '@/components/Marketplace/BestSeller'
import BannerBelow from '@/components/Marketplace/BannerBelow'
import TopProduct from '@/components/Marketplace/TopProduct'
import Recommend from '@/components/Marketplace/Recommend'

export default function HomeMarketplace() {
    return (
        <>
            <div id="header" className='relative w-full'>
            <MenuOne props="bg-white" />
                <SliderMarketplace />
            </div>
            <BannerAbove />
            <Deal />
            <Collection />
            <BestSeller data={productData} start={0} limit={5} />
            <BannerBelow />
            <TopProduct />
            <Recommend />
            <Benefit props='md:py-[60px] py-10 border-b border-line' />
            <Brand />
            <Footer />
        </>
    )
}
