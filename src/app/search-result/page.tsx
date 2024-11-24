'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';
import productData from '@/data/Product.json';
import Product from '@/components/Product/Product';
import HandlePagination from '@/components/Other/HandlePagination';
import ProductCategories from './ProductCategories';
import PriceFilter from './PriceFilter';

const SearchResult = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;
    const offset = currentPage * productsPerPage;

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || 'dress';

    let filteredData = productData.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.type.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
        filteredData = [
            {
                id: 'no-data',
                category: 'no-data',
                type: 'no-data',
                name: 'no-data',
                gender: 'no-data',
                new: false,
                sale: false,
                rate: 0,
                price: 0,
                originPrice: 0,
                brand: 'no-data',
                sold: 0,
                quantity: 0,
                quantityPurchase: 0,
                sizes: [],
                variation: [],
                thumbImage: [],
                images: [],
                description: 'no-data',
                action: 'no-data',
                slug: 'no-data',
            },
        ];
    }

    const pageCount = Math.ceil(filteredData.length / productsPerPage);
    const currentProducts = filteredData.slice(offset, offset + productsPerPage);

    const handleSearch = (value: string) => {
        router.push(`/search-result?query=${value}`);
        setSearchKeyword('');
    };

    const handlePageChange = (selected: number) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            {/* Top Navigation */}
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />

            {/* Header */}
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Search Result" subHeading="Search Result" />
            </div>

            <div className="flex flex-col lg:flex-row gap-10 p-6">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6 self-start">
                    {/* Product Categories */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                            Product Categories
                        </h2>
                        <ProductCategories />
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                            Price Filter
                        </h2>
                        <PriceFilter
                            onFilter={(range: [number, number]) => {
                                console.log('Filtered range:', range);
                            }}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="shop-product lg:py-20 md:py-14 py-10">
                        <div className="container">
                            {/* Search Heading */}
                            <div className="heading flex flex-col items-center">
                                <div className="heading4 text-center">
                                    Found {filteredData.length} results for `{query}``
                                </div>
                                {/* Search Input */}
                                <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
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
                                    {currentProducts.map((item) =>
                                        item.id === 'no-data' ? (
                                            <div key={item.id} className="no-data-product">
                                                No products match the selected criteria.
                                            </div>
                                        ) : (
                                            <Product key={item.id} data={item} type="grid" />
                                        )
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
