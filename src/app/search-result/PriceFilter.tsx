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
  className="h-2 bg-secondary rounded"
  thumbClassName="h-6 w-6 bg-blue rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 transform -translate-y-2"
  trackClassName="bg-blue-500 h-2 rounded"
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
        className="mt-4 px-4 py-2 bg-purple text-white font-bold rounded hover:bg-blue-600"
      >
        FILTER
      </button>
    </div>
  );
};

export default PriceFilter;
