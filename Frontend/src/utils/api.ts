import axios, { AxiosError } from "axios";

// Base URL API backend
export const API_URL = "http://localhost:3000";

// Fungsi untuk mendaftar pengguna baru
export const signup = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error during signup: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fungsi untuk login pengguna
export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error during login: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fungsi untuk mengambil semua produk
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/allproducts`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching products: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fungsi untuk menambahkan produk baru
export const addProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[];
}) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error adding product: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fungsi untuk mengonfirmasi order
export const confirmOrder = async (orderData: {
  userId: string;
  items: { id: string; quantity: number }[];
  total: number;
  expedition: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, orderData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error confirming order: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fungsi untuk mengambil status pengiriman berdasarkan ID pesanan
export const fetchOrderStatus = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Error fetching order status: ' + (error.response?.data.message || error.message));
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchProductById = async (productId: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data; // Assuming the response data is the product
  } catch (error: unknown) { // Changed AxiosError to unknown for best practice
    if (axios.isAxiosError(error)) {
      // Checking if the error is an instance of AxiosError
      throw new Error(`Error fetching product by ID: ${error.response?.status} ${error.response?.statusText}`);
    } else {
      // This will handle cases where the error might not be from Axios
      throw new Error("An unknown error occurred");
    }
  }
};




