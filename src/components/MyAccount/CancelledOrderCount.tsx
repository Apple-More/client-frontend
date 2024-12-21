import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const CancelledOrderCount = () => {
  return (
    <>
      <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
        <div className="counter">
          <span className="tese">Cancelled Orders</span>
          <h5 className="heading5 mt-1">12</h5>
        </div>
        <Icon.ReceiptX className="text-4xl" />
      </div>
    </>
  );
};

export default CancelledOrderCount;
