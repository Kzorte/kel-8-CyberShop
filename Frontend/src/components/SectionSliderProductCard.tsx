"use client";
import React, { useEffect, useState, useRef } from 'react';
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from './ProductCard';
import Heading from "@/components/Heading/Heading";
import { fetchProducts } from '@/utils/api';
import Link from 'next/link';
import { Product } from '@/data/data';

interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  headingClassName?: string;  // Added this to match your usage
  headingFontClassName?: string;  // Added this to match your usage
}

const SectionSliderProductCard: React.FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  heading = "New Arrivals",
  subHeading = "",
  headingClassName = "",  // Added this to match your usage
  headingFontClassName = "",  // Added this to match your usage
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchAndSetProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Failed to fetch products:', error);
        setIsLoading(false);
        setError('Failed to load products');
      }
    }

    fetchAndSetProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && sliderRef.current) {
      const glide = new Glide(sliderRef.current, {
        type: 'carousel',
        perView: 4,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: { perView: 3 },
          1024: { perView: 2 },
          768: { perView: 2 },
          640: { perView: 1 },
          500: { perView: 1 },
        },
        peek: {
          before: 100,
          after: 50,
        }
      });

      glide.mount();
      setIsShow(true);

      return () => {
        glide.destroy();
      };
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <Link href={`/product-detail?productId=${item.id}`}>
                  <ProductCard data={item} isLiked={false} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
