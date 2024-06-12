"use client";

import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Prices from "@/components/Prices";
import { useAuth } from "@/context/AuthContext";  // Adjust the path as needed
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { Product } from '@/data/data';

const CartDropdown: React.FC = () => {
  const { cartItems, removeFromCart } = useAuth();

  const renderProduct = (item: Product, index: number) => (
    <div key={index} className="flex py-5 last:pb-0">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          fill
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain object-center"
        />
        <Link href={`/product-detail/${item.id}`} legacyBehavior>
          <a className="absolute inset-0"></a>
        </Link>
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <h3 className="text-base font-medium">
          <Link href={`/product-detail/${item.id}`} legacyBehavior>
            <a>{item.name}</a>
          </Link>
        </h3>
        <Prices price={item.price} className="mt-0.5" />
        <div className="flex items-end justify-between text-sm">
          <p className="text-gray-500">{`Qty: 1`}</p>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="font-medium text-primary-600 dark:text-primary-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button className={`group w-10 h-10 rounded-full focus:outline-none ${open ? '' : 'text-opacity-90'}`}>
            <span className="absolute top-1.5 right-1.5 bg-primary-500 rounded-full text-white text-xs font-medium px-2 py-1">
              {cartItems.length ?? 0}
            </span>
            <svg className="w-6 h-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {/* Icon content */}
            </svg>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-80">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-5 bg-white">
                  <h3 className="text-xl font-semibold">Shopping Cart</h3>
                  {cartItems.length > 0 ? (
                    cartItems.map(renderProduct)
                  ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                  )}
                </div>
                <div className="p-5 bg-gray-50 flex justify-between">
                  <ButtonPrimary href="/checkout" onClick={close}>
                    Check out
                  </ButtonPrimary>
                  <ButtonSecondary onClick={close}>
                    Close
                  </ButtonSecondary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default CartDropdown;
