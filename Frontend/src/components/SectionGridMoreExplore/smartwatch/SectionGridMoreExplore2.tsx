"use client";

import React, { FC, useEffect, useState } from "react";
import axios from 'axios';
import Heading from "@/components/Heading/Heading";
import ProductCard from "../../ProductCard";
import { Product } from "@/data/data";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  gridClassName = "grid-cols-2 md:grid-cols-2 xl:grid-cols-4",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async (p0?: any[]) => {
      try {
        const res = await axios.get('http://localhost:3000/categories');
        fetchCategories([{ name: 'SmartWacth' }, ...res.data]);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to fetch categories');
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/allproducts');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products');
      }
      setLoading(false);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const renderHeading = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <div>
        <Heading
          className="mb-4 md:mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          SmartWatch
        </Heading>
        <div className="flex-1 ">   
          <div className={`flex-1 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 ${gridClassName}`}>
            {products.filter(product => product.category === "SmartWacth").map((product, index) => (
              <ProductCard key={index} data={product} isLiked={false} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
    </div>
  );
};

export default SectionGridMoreExplore;
