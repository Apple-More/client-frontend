import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const TotalOrderCount = () => {
  return (
    <>
      <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
        <div className="counter">
          <span className="tese">Total Number of Orders</span>
          <h5 className="heading5 mt-1">4</h5>
        </div>
        <Icon.Package className="text-4xl" />
      </div>
    </>
  );
};

export default TotalOrderCount;
