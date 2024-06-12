"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';  // Sesuaikan path
import Prices from '@/components/Prices';
import Image from 'next/image';
import Link from 'next/link';
import ButtonPrimary from "@/shared/Button/ButtonPrimary"; // Tambahkan import ini jika belum ada
import { Product } from '@/data/data';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useAuth();

  const renderProduct = (item: Product, index: number) => {
    return (
      <div key={index} className="flex py-5 border-b">
        <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-slate-100">
          <Image src={item.image} alt={item.name} layout="fill" objectFit="contain" />
        </div>
        <div className="flex flex-1 flex-col ml-4">
          <Link href={`/product-detail/${item.id}`} legacyBehavior>
            <a className="text-lg font-bold">{item.name}</a>
          </Link>
          <Prices price={item.price} />
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div>{cartItems.map(renderProduct)}</div>
      <div className="mt-6">
        <ButtonPrimary href="/checkout">Proceed to Checkout</ButtonPrimary>
      </div>
    </div>
  );
};

export default CartPage;
