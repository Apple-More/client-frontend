'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';
import productData from '@/data/Product.json';
import ProductSearch from '@/components/Product/ProductSearch';
import HandlePagination from '@/components/Other/HandlePagination';
import ProductCategories from './ProductCategories';
import PriceFilter from './PriceFilter';
import { searchProduct } from "../../services/ProductService";


const SearchResult = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [products, setProducts] = useState([]);
    const productsPerPage = 8;
    const offset = currentPage * productsPerPage;

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';

    const pageCount = Math.ceil(products.length / productsPerPage);
    const currentProducts = products.slice(offset, offset + productsPerPage);

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`);
        setSearchKeyword('');
    };

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    const fetchProducts = async () => {
        try {
            const response = await searchProduct(query, category);

            const products = response.data;

            console.log(products);

            setProducts(products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [query, category])

    return (
        <div>
            {/* Header */}
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Search Result" subHeading="Search Result" />
            </div>

            <div className="flex flex-col lg:flex-row gap-10 p-6">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6 self-start">
                    {/* Product Categories */}
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                            Product Categories
                        </h2>
                        <ProductCategories />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="shop-product py-3">
                        <div className="container">
                            {/* Search Heading */}
                            <div className="heading flex flex-col items-center">
                                {/* Search Input */}
                                <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-2 mt-2">
                                    <div className="w-full h-full relative">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="caption1 w-full h-full pl-4 md:pr-[150px] pr-32 rounded-xl border border-line"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                                        />
                                        <button
                                            className="button-main absolute top-1 bottom-1 right-1 flex items-center justify-center"
                                            onClick={() => handleSearch(searchKeyword)}
                                        >
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product List */}
                            <div className="list-product-block relative md:pt-10 pt-6">
                                <div className="heading6 ml-14">Product Search: {query}</div>
                                <div className="list-product grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5">
                                    {currentProducts.map((item, index) =>
                                        <ProductSearch key={index} data={item} type="grid" />
                                    )}
                                </div>

                                {/* Pagination */}
                                {pageCount > 1 && (
                                    <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                                        <HandlePagination pageCount={pageCount} onPageChange={handlePageChange} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default SearchResult;
