
import React, { useState } from "react";

interface Category {
  name: string;
  subcategories: string[];
}

export const ProductCategories: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

   const categories: Category[] = [
    {
      name: "iPhone",
      subcategories: [
        "iPhone 16 Pro Max",
        "iPhone 16 Pro",
        "iPhone 16 Plus",
        "iPhone 16",
        "iPhone 15 Pro Max",
        "iPhone 15 Pro",
        "iPhone 15 Plus",
        "iPhone 15",
        "iPhone 14 Pro Max",
        "iPhone 14 Pro",
        "iPhone 14 Plus",
        "iPhone 14",
        "iPhone 13 Pro Max",
        "iPhone 13 Pro",
        "  iPhone 13",
        "iPhone 13 mini",
        "iPhone 12",
        "iPhone 11",
        "iPhone SE 3",
      ],
    },
    { name: "Mac", subcategories: [
        " Accessories",
        "Displays",
        "iMac",
        "Mac mini",
        "Mac Pro",
        "Mac Studio",
        "MacBook Air",
        "MacBook Pro",
    ] },
    { name: "iPad", subcategories: [
        "iPad",
        "  iPad Air",
        "iPad mini",
        " iPad Pro",

    ] },
    { name: "Apple Watch", subcategories: [
        "Apple Watch series 7",
        "Apple Watch series 8",
        "Apple Watch Series 9",
        "Apple Watch Series 10",
        "Apple Watch Ultra",
        "Apple Watch Ultra 2",

    ] },
    { name: "AirPods", subcategories: [
        "AirPods",
        " AirPods 2",
        "  AirPods 3",
        " AirPods 4",
        " AirPods Max",
        "AirPods Pro",
        " AirPods Pro 2",
        " AirPods Pro MagSafe",

    ] },
    // { name: "Apple Vision Pro", subcategories: [] },
    // { name: "Tv & Home", subcategories: [] },
    // { name: "Accessories", subcategories: [] },
    // { name: "AirTag", subcategories: [] },
    // { name: "Apple Pencil", subcategories: [] },
    // { name: "Dyson", subcategories: [] },
    // { name: "Earbuds", subcategories: [] },
    // { name: "Headphone", subcategories: [] },
    // { name: "HomePod", subcategories: [] },
    // { name: "iPhone Pre-Owned (Used)", subcategories: [] },
    // { name: "Meta Quest", subcategories: [] },
  ];

  const handleCategoryClick = (categoryName: string): void => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  return (
    <div className="product-categories">
      <h2 className="font-bold text-xl mb-4">Product Categories</h2>
      <ul className="list-none">
        {categories.map((category, index) => (
          <li key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <span
                className={`${
                  expandedCategory === category.name
                    ? "font-bold text-black"
                    : "text-gray-600"
                }`}
              >
                {category.name}
              </span>
              {category.subcategories.length > 0 && (
                <span>{expandedCategory === category.name ? "▾" : "▸"}</span>
              )}
            </div>
            {/* Subcategory List */}
            {expandedCategory === category.name && category.subcategories.length > 0 && (
              <ul className="ml-4 mt-2">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-gray-600 hover:text-black cursor-pointer"
                  >
                    {subcategory}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
