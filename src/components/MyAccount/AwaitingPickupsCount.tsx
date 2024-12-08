import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const AwaitingPickupsCount = () => {
  return (
    <>
      <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
        <div className="counter">
          <span className="tese">Awaiting Pickup</span>
          <h5 className="heading5 mt-1">1</h5>
        </div>
        <Icon.HourglassMedium className="text-4xl" />
      </div>
    </>
  );
};

export default AwaitingPickupsCount;
