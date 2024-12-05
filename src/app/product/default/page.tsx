'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct'
import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import productData from '@/data/Product.json'
import { getProductById } from '../../../services/ProductService';

const ProductDefault = () => {
    const searchParams = useSearchParams()
    let productId = searchParams.get('id')
    const [product, setProduct] = useState(null)

    
    const fetchProductById = async () => {
        try{
            if(!productId){
                return
            }
            const response = await getProductById(productId)

            setProduct(response.data)
        } catch (error) {
            console.log('Failed to fetch product data: ', error)
        }
    }

    useEffect(() => {
        fetchProductById()
    }, [])

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-white" />
                <BreadcrumbProduct data={productData} productPage='default' productId={productId} />
            </div>
            <Default data={productData} productId={productId} />
            <Footer />
        </>
    )
}

export default ProductDefault