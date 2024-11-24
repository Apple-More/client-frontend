import React, { useState } from "react";

interface Category {
  name: string;
}

export const ProductCategories: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    { name: "iPhone" },
    { name: "Mac" },
    { name: "iPad" },
    { name: "Apple Watch" },
    { name: "AirPods" },
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
