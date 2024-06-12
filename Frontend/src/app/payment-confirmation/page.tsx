"use client";

import React from "react";
import Image from "next/image"; // Pastikan impor Image dari next/image
import Link from "next/link";
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook
import ButtonPrimary from "@/shared/Button/ButtonPrimary"; // Import ButtonPrimary
import Prices from "@/components/Prices"; // Pastikan Prices diimpor dengan benar

const PaymentConfirmationPage = () => {
  const { cartItems } = useAuth();

  return (
    <div className="nc-PaymentConfirmationPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Payment Confirmation
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Payment Confirmation</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700">
              {cartItems.map((item, index) => (
                <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
                  <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={item.image}
                      fill
                      alt={item.name}
                      className="h-full w-full object-contain object-center"
                      sizes="150px"
                    />
                    <Link href={`/product-detail/${item.id}`} legacyBehavior>
                      <a className="absolute inset-0"></a>
                    </Link>
                  </div>
                  <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div className="flex-[1.5]">
                        <h3 className="text-base font-semibold">
                          <Link href={`/product-detail/${item.id}`} legacyBehavior>
                            <a>{item.name}</a>
                          </Link>
                        </h3>
                        <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center space-x-1.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8.35 1.94995L9.69 3.28992"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.07 11.92L17.19 11.26"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M3 22H16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{`Blue`}</span>
                          </div>
                          <span className="mx-4 border-l border-slate-200 dark:border-slate-700"></span>
                          <div className="flex items-center space-x-1.5"></div>
                        </div>
                        <div className="mt-3 flex justify-between w-full sm:hidden relative">
                          <select
                            name="qty"
                            id="qty"
                            className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800"
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                          </select>
                          <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                            price={item.price}
                          />
                        </div>
                      </div>
                      <div className="hidden flex-1 sm:flex justify-end">
                        <Prices price={item.price} className="mt-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 lg:pl-12 mt-10 lg:mt-0">
            <h3 className="text-lg font-semibold">Bank Account Details</h3>
            <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              <p>
                Please transfer the total amount to the following bank account:
              </p>
              <ul className="mt-2">
                <li>Bank: BCA</li>
                <li>Account Number: 628563477</li>
                <li>Account Name: PT.Electron Indonesia</li>
              </ul>
              <p className="mt-4">
                After making the payment, please send the payment proof to our email: payment@yourstore.com
              </p>
            </div>
            <div className="mt-6">
              <Link href="/" passHref legacyBehavior>
                <ButtonPrimary>Return to Homepage</ButtonPrimary>
              </Link>
            <div className="mt-4">
              <Link href="/shipment-status" passHref>
                <ButtonPrimary>Status Pengiriman</ButtonPrimary>
             </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmationPage;
