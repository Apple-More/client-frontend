"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HistoryOrderListProps {
  openDetail: boolean | undefined;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const HistoryOrderList: React.FC<HistoryOrderListProps> = ({
  openDetail,
  setOpenDetail,
}) => {
  return (
    <>
      <div className="list_order">
        <div className="order_item mt-5 border border-line rounded-lg box-shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-line">
            <div className="flex items-center gap-2">
              <strong className="text-title">Order Number:</strong>
              <strong className="order_number text-button uppercase">
                s184989823
              </strong>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-title">Order status:</strong>
              <span className="tag px-4 py-1.5 rounded-full bg-opacity-10 bg-purple text-purple caption1 font-semibold">
                Delivery
              </span>
            </div>
          </div>
          <div className="list_prd px-5">
            <div className="prd_item flex flex-wrap items-center justify-between gap-3 py-5 border-b border-line">
              <Link
                href={"/product/default"}
                className="flex items-center gap-5"
              >
                <div className="bg-img flex-shrink-0 md:w-[100px] w-20 aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={"/images/product/1000x1000.png"}
                    width={1000}
                    height={1000}
                    alt={"Contrasting sheepskin sweatshirt"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="prd_name text-title">
                    Contrasting sheepskin sweatshirt
                  </div>
                  <div className="caption1 text-secondary mt-2">
                    <span className="prd_size uppercase">XL</span>
                    <span>/</span>
                    <span className="prd_color capitalize">Yellow</span>
                  </div>
                </div>
              </Link>
              <div className="text-title">
                <span className="prd_quantity">1</span>
                <span> X </span>
                <span className="prd_price">$45.00</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 p-5">
            <button className="button-main" onClick={() => setOpenDetail(true)}>
              Order Details
            </button>
            <button className="button-main bg-surface border border-line hover:bg-black text-black hover:text-white">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryOrderList;
