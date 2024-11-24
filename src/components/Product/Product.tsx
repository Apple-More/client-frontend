"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import Rate from "../Other/Rate";

interface ProductProps {
  data: ProductType;
  type: string;
}

const Product: React.FC<ProductProps> = ({ data, type }) => {
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [openQuickShop, setOpenQuickShop] = useState<boolean>(false);
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { openModalCompare } = useModalCompareContext();
  const { openQuickview } = useModalQuickviewContext();
  const router = useRouter();

  const handleActiveSize = (item: string) => {
    setActiveSize(item);
  };



  

 


  const handleDetailProduct = (productId: string) => {
    // redirect to shop with category selected
    router.push(`/product/default?id=${productId}`);
  };

  let percentSale = Math.floor(100 - (data.price / data.originPrice) * 100);
  let percentSold = Math.floor((data.sold / data.quantity) * 100);

  return (
    <>
      {type === "grid" ? (
        <div className="product-item grid-type ml-16 ">
          <div
            onClick={() => handleDetailProduct(data.id)}
            className="product-main cursor-pointer block"
          >
            <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
              <div className="product-img w-[200px] h-[200px] aspect-[3/4] ">
                {activeColor ? (
                  <>
                    {
                      <Image
                        src={
                          data.variation.find(
                            (item) => item.color === activeColor
                          )?.image ?? ""
                        }
                        width={180}
                        height={180}
                        alt={data.name}
                        priority={true}
                        className="w-full h-full object-cover duration-700"
                      />
                    }
                  </>
                ) : (
                  <>
                    {data.thumbImage.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        width={180}
                        height={180}
                        priority={true}
                        alt={data.name}
                        className="w-full h-full object-cover duration-700"
                      />
                    ))}
                  </>
                )}
              </div>

              <div className="list-action-icon flex items-center justify-center gap-2 absolute w-full bottom-3 z-[1] lg:hidden"></div>
            </div>
            <div className="product-infor mt-4 lg:mb-7">
              <div className="product-sold sm:pb-4 pb-2">
                <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                
                </div>
                <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2"></div>
              </div>
              <div className="product-name text-title duration-300">
                {data.name}
              </div>
            </div>

            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title">${data.price}.00</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Product;
