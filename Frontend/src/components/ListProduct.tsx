import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Product, Category } from "@/data/data";

const ListProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3000/categories');
        setCategories(res.data);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = selectedCategory !== 'All Items' ? products.filter(p => p.category === selectedCategory) : products;

  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ListProduct;
