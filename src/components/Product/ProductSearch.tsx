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

const ProductSearch: React.FC<ProductProps> = ({ data, type }) => {
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

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
    });
  };

  const handleActiveSize = (item: string) => {
    setActiveSize(item);
  };

  return (
    <>
      {type === "grid" ? (
        <div className="product-item grid-type ml-16">
          <div
            className="product-main cursor-pointer block"
            onClick={() => router.push(`/product/default?id=${data.id}`)}
          >
            <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
              <div className="product-img w-[200px] h-[200px] aspect-[3/4] ">
                <Image
                        src={
                           data.images[0]?.imageUrl
                        }
                        width={180}
                        height={180}
                        alt={data.name}
                        priority={true}
                        className="w-full h-full object-scale-down duration-700"
                 />
              </div>

              <div className="list-action-icon flex items-center justify-center gap-2 absolute w-full bottom-3 z-[1] lg:hidden"></div>
            </div>
            <div className="product-infor">
              <div className="product-name text-title duration-300">
                {data.productName}
              </div>
            </div>

            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title">{formatPrice(data.price)}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductSearch;
