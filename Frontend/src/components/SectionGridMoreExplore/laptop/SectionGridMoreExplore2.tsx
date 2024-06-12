"use client";

import React, { FC, useEffect, useState } from "react";
<<<<<<< HEAD
import axios from 'axios';
import Heading from "@/components/Heading/Heading";
import ProductCard from "../../ProductCard";
import { Product } from "@/data/data";
=======

import Heading from "@/components/Heading/Heading";
import { DEMO_MORE_EXPLORE_DATA, ExploreType } from "../data";
import { PRODUCTS } from "@/data/data";
import ProductCard from "../../ProductCard";
>>>>>>> 614bebeecdd0b1cf471144e4a4a083002e1f228f

export interface SectionGridMoreExploreProps {
  className?: string;
  gridClassName?: string;
<<<<<<< HEAD
=======
  boxCard?: "box1" | "box4" | "box6";
  data?: ExploreType[];
>>>>>>> 614bebeecdd0b1cf471144e4a4a083002e1f228f
}

const SectionGridMoreExplore: FC<SectionGridMoreExploreProps> = ({
  className = "",
  gridClassName = "grid-cols-2 md:grid-cols-2 xl:grid-cols-4",
<<<<<<< HEAD
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async (p0?: any[]) => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/categories');
        fetchCategories([{ name: 'Laptop' }, ...res.data]);
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

  const renderHeading = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

=======
  data: initialData = DEMO_MORE_EXPLORE_DATA.filter((_, i) => i < 4),
}) => {
  const [filteredData, setFilteredData] = useState(PRODUCTS);
  const [tabActive, setTabActive] = useState("All Items");

  useEffect(() => {
    localStorage.setItem("tabActive", tabActive);
  }, [tabActive]);

  useEffect(() => {
    const savedTabActive = localStorage.getItem("tabActive");
    if (savedTabActive) {
      setTabActive(savedTabActive);
    }
  }, []);

  useEffect(() => {
    if (tabActive === "All Items") {
      setFilteredData(PRODUCTS.filter(product => product.category === "Laptop"));
    }
  }, [tabActive]);

  const renderHeading = () => {
>>>>>>> 614bebeecdd0b1cf471144e4a4a083002e1f228f
    return (
      <div>
        <Heading
          className="mb-4 md:mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          fontClass="text-xl md:text-4xl 2xl:text-5xl font-semibold"
          isCenter
          desc=""
        >
<<<<<<< HEAD
          NoteBook
        </Heading>
        <div className="flex-1 ">   
          <div className={`flex-1 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 ${gridClassName}`}>
            {products.filter(product => product.category === "NoteBook").map((product, index) => (
              <ProductCard key={index} data={product} isLiked={false} />
=======
          Category
        </Heading>
        <div className="flex-1 ">   
          <div className={`flex-1 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10 ${gridClassName}`}>
            {filteredData.map((product, index) => (
              <ProductCard key={index} data={product} />
>>>>>>> 614bebeecdd0b1cf471144e4a4a083002e1f228f
            ))}
          </div>
        </div>
      </div>
    );
  };

<<<<<<< HEAD
=======
  const handleTabClick = (category: string) => {
    setTabActive(category);
  };

>>>>>>> 614bebeecdd0b1cf471144e4a4a083002e1f228f
  return (
    <div className={`nc-SectionGridMoreExplore relative ${className}`}>
      {renderHeading()}
    </div>
  );
};

export default SectionGridMoreExplore;
