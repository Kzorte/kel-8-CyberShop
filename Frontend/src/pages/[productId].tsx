// src/pages/product/[productId].js atau .tsx
import React from 'react';
import dynamic from 'next/dynamic';

const ProductDetailPage = dynamic(() => import('@/app/product-detail/page'), {
  ssr: false,  // Nonaktifkan server-side rendering untuk komponen ini
});

export default function ProductPage() {
  return <ProductDetailPage />;
}
