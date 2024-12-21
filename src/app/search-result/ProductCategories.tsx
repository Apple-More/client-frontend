import React, { useState, useEffect } from "react";
import { getCategories } from "../../services/ProductService";
import { useRouter } from 'next/navigation';

interface Category {
  categoryName: string;
}

export const ProductCategories: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

  const fetchCategories = async () => {
    try{
      const response = await getCategories();

      const categories = response.data;

      console.log(categories);

      setCategories(categories);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  // const categories: Category[] = [
  //   { name: "iPhone" },
  //   { name: "Mac" },
  //   { name: "iPad" },
  //   { name: "Apple Watch" },
  //   { name: "AirPods" },
  // ];

  return (
    <div className="product-categories">
      <ul className="list-none">
        {categories.map((category, index) => (
          <li key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => {router.push(`/search-result?category=${category.categoryName}`)}}
            >
              <span
                className={`${
                  expandedCategory === category.categoryName
                    ? "font-bold text-black"
                    : "text-gray-600"
                }`}
              >
                {category.categoryName}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
