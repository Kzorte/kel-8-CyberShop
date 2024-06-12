"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Gunakan dari next/navigation untuk App Router
import Image, { StaticImageData } from 'next/image';
import { fetchOrderStatus } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
// import jamImage from '@/assets/jam.png';
// import dikirimImage from '@/assets/dikirim.png';
// import sampaiImage from '@/assets/sampai.png';
// import verifikasiImage from '@/assets/verifikasi.png';

const orderId = '123456'; // Replace with real order ID as needed

const ShipmentStatusPage: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<string>('Loading...');
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const fetchStatus = async () => {
        try {
          const data = await fetchOrderStatus(orderId);
          setOrderStatus(data.status);
        } catch (error) {
          console.error('Failed to fetch order status:', error);
        }
      };

      fetchStatus();
      const interval = setInterval(fetchStatus, 10000); // Update every 10 seconds
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const renderStatusIndicator = (currentStatus: string, expectedStatus: string, imageSrc: StaticImageData, altText: string) => {
    const isActive = currentStatus === expectedStatus;
    const textColorClass = isActive ? 'text-green-600' : 'text-gray-400';
    const fontWeightClass = isActive ? 'font-semibold' : 'font-normal';
    const borderColorClass = isActive ? 'border-green-500' : 'border-transparent';

    return (
      <div className={`flex flex-col items-center border-2 ${borderColorClass} rounded-lg p-3`}>
        <Image src={imageSrc} width={100} height={100} alt={altText} />
        <p className={`text-center ${textColorClass} ${fontWeightClass}`}>{altText}</p>
        {isActive && <p className="text-center mt-2">{getStatusDescription(currentStatus)}</p>}
      </div>
    );
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'Pesanan Anda sedang menunggu konfirmasi.';
      case 'Shipped':
        return 'Pesanan Anda sedang dalam proses pengiriman.';
      case 'Delivered':
        return 'Pesanan Anda telah sampai.';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Status Pengiriman</h1>
      <div className="mt-4">
        <p>Informasi detail tentang status pengiriman Anda akan ditampilkan di sini.</p>
        <div className="mt-4 p-4 border rounded">
          <p>Nomor Pesanan: #{orderId}</p>
          <p>Status: {orderStatus}</p>
          <p>Estimasi Tiba: 3-5 Hari Kerja</p>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {/* {renderStatusIndicator(orderStatus, 'Menunggu Konfirmasi', jamImage, 'Menunggu Konfirmasi')}
        {renderStatusIndicator(orderStatus, 'Confirmed', verifikasiImage, 'Pesanan Anda telah dikonfirmasi')}
        {renderStatusIndicator(orderStatus, 'Shipped', dikirimImage, 'Pesanan Sedang Dikirim')}
        {renderStatusIndicator(orderStatus, 'Delivered', sampaiImage, 'Pesanan Sampai')} */}
      </div>
      <div className="mt-6 flex justify-center">
        <Link href="/" passHref>
          <ButtonPrimary>Kembali ke Beranda</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default ShipmentStatusPage;
