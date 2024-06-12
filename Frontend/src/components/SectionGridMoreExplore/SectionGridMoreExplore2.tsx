"use client";

import React, { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading/Heading";
import NavItem2 from "@/components/NavItem2";
import Nav from "@/shared/Nav/Nav";
import axios from 'axios';
import ProductCard from "../ProductCard";
import { Product, Category } from "@/data/data";

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  gridClassName = "grid-cols-2 md:grid-cols-2 xl:grid-cols-4",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/categories');
        setCategories([{ name: 'All Items' }, ...res.data]); // Add 'All Items' as the first category
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to fetch categories');
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/allproducts');
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

  useEffect(() => {
    localStorage.setItem("tabActive", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const savedTabActive = localStorage.getItem("tabActive");
    if (savedTabActive) {
      setSelectedCategory(savedTabActive);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = selectedCategory !== 'All Items' ? products.filter(p => p.category === selectedCategory) : products;

  const renderHeading = () => {
    return (
      <div>
        <Heading
          className="mb-4 md:mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
          Category
        </Heading>
        <Nav
          className="p-1 bg-white dark:bg-neutral-800 rounded-full shadow-lg overflow-x-auto Scrollbar sm:text-md"
          containerClassName="mb-4 md:mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base"
        >
          {categories.map((item, index) => (
            <NavItem2
              key={index}
              isActive={selectedCategory === item.name}
              onClick={() => handleTabClick(item.name)}
            >
              {item.name}
            </NavItem2>
          ))}
        </Nav>
        <div className="flex-1 ">
          <div className={`flex-1 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 ${gridClassName}`}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} data={product} isLiked={false} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
    </div>
  );
};

export default SectionGridMoreExplore;
