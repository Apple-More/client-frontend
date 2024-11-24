import React, { useState } from "react";
import ReactSlider from "react-slider";

const PriceFilter = ({ onFilter }: { onFilter: (range: [number, number]) => void }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([129900, 689900]);

  const handleFilter = () => {
    onFilter(priceRange); // Pass the selected range to the parent component
  };

  return (
    <div className=" ">
      <h2 className="font-bold text-lg mb-4">FILTER BY PRICE</h2>
      <ReactSlider
  className="h-4 bg-gray-300 rounded"
  thumbClassName="h-4 w-4 bg-blue-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
  trackClassName="bg-blue-500 h-4 rounded"
  defaultValue={[129900, 689900]}
  min={100000}
  max={700000}
  step={1000}
  onChange={(value) => setPriceRange(value)}
  value={priceRange}
/>


      <p className="text-gray-700 mt-4">
        Price: LKR {priceRange[0].toLocaleString()} — LKR {priceRange[1].toLocaleString()}
      </p>
      <button
        onClick={handleFilter}
        className="mt-4 px-4 py-2 bg-blue-500 text-black font-bold rounded hover:bg-blue-600"
      >
        FILTER
      </button>
    </div>
  );
};

export default PriceFilter;
