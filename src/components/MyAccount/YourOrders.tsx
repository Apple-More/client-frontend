"use client";
import React, { useState } from "react";

const YourOrders = () => {
  const [activeOrders, setActiveOrders] = useState<string | undefined>("all");

  const handleActiveOrders = (order: string) => {
    setActiveOrders(order);
  };

  return (
    <>
      <h6 className="heading6">Your Orders</h6>
      <div className="w-full overflow-x-auto">
        <div className="menu-tab grid grid-cols-5 max-lg:w-[500px] border-b border-line mt-3">
          {["all", "pending", "delivery", "completed", "canceled"].map(
            (item, index) => (
              <button
                key={index}
                className={`item relative px-3 py-2.5 text-secondary text-center duration-300 hover:text-black border-b-2 ${
                  activeOrders === item
                    ? "active border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleActiveOrders(item)}
              >
                {/* {activeOrders === item && (
                                                <motion.span layoutId='active-pill' className='absolute inset-0 border-black border-b-2'></motion.span>
                                                )} */}
                <span className="relative text-button z-[1]">{item}</span>
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default YourOrders;
