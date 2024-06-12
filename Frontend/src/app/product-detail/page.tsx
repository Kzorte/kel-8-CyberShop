"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { fetchProductById } from "@/utils/api";
import Prices from "@/components/Prices";
import LikeButton from "@/components/LikeButton";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { Product } from "@/data/data";
import Policy from "./Policy";
import ModalViewAllReviews from "./ModalViewAllReviews";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { useAuth } from '@/context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams ? searchParams.get('productId') : null;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useAuth();

  useEffect(() => {
    if (productId) {
      fetchProductById(productId)
        .then(data => {
          setProduct(data.product);
          setIsLoading(false);
        })
        .catch(error => {
          setError("Failed to load product details.");
          setIsLoading(false);
        });
    } else {
      setError("Product ID is not provided.");
      setIsLoading(false);
    }
  }, [productId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found!</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="border p-3 rounded shadow-lg">
          <Image src={product.image} alt={product.name} width={1000} height={500} className="border rounded" />
        </div>
        <div className="border p-3 rounded shadow-lg">
          <h1 className="text-2xl font-bold border-b pb-2">{product.name}</h1>
          <div className="flex items-center space-x-3 my-4">
            <Prices price={product.price} />
            <input
              type="number"
              className="w-16 text-center border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
            />
            <ButtonPrimary onClick={handleAddToCart} className="bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
              <BagIcon className="w-5 h-5 mr-2" />
              Add to cart
            </ButtonPrimary>
          </div>
          <div className="flex items-center space-x-3 my-4">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-700">4.9</span>
            <span className="text-gray-500">·</span>
            <a href="#reviews" className="underline text-gray-700">142 reviews</a>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <p className="text-lg font-bold text-black bg-gray-100 border border-gray-300 p-2 rounded w-full">Description</p>
          </div>
          <p className="py-2 border border-gray-300 rounded p-4">{product.description}</p>
          <div className="flex items-center gap-2 mt-4">
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Policy />
      </div>

      <div className="mt-12">
        <ModalViewAllReviews show={false} onCloseModalViewAllReviews={() => {}} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
