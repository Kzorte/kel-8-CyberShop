// ModalQuickView.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import ProductQuickView from "./ProductQuickView";
import ProductQuickView2 from "./ProductQuickView2";
import { useRouter } from "next/navigation"; // Corrected the import from 'next/router' instead of 'next/navigation'

export interface ModalQuickViewProps {
  show: boolean;
  onCloseModalQuickView: () => void;
}

const ModalQuickView: FC<ModalQuickViewProps> = ({
  show,
  onCloseModalQuickView,
}) => {
  const router = useRouter();  // Correct usage of useRouter
  const pathname = router.pathname ?? "";  // Safely access pathname with fallback to empty string

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onCloseModalQuickView}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <span className="hidden align-middle" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <ButtonClose onClick={onCloseModalQuickView} />
              {pathname.includes("/home-2") ? <ProductQuickView2 /> : <ProductQuickView />}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalQuickView;
