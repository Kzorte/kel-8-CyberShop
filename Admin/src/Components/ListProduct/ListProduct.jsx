import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/hapus.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    price: 0,
    stock: 0,
    description: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/allproducts");
      const data = await response.json();
      setAllProducts(data.map(product => ({
        ...product,
        date: new Date(product.date).toLocaleString()
      })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await fetch("http://127.0.0.1:3000/removeproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      fetchProducts();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const editProduct = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.image.startsWith('data:image')) {
      try {
        const uploadData = new FormData();
        const blob = await fetch(formData.image).then(res => res.blob());
        uploadData.append('image', blob);
        const uploadResp = await fetch('http://127.0.0.1:3000/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadResult = await uploadResp.json();
        formData.image = uploadResult.image_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    try {
      const response = await fetch(`http://127.0.0.1:3000/editproduct/${editingProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      fetchProducts();
      setEditingProductId(null);
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>Daftar Semua Produk</h1>
      <div className="listproduct-format-main">
        <p>Produk</p>
        <p>Judul</p>
        <p>Harga</p>
        <p>Kategori</p>
        <p>Tanggal</p>
        <p>Stok</p>
        <p>Edit</p>
        <p>Hapus</p>
      </div>
      <div className="listproduct-allproducts">
        {allProducts.map((product, index) => (
          <div key={index} className="listproduct-format">
            <img src={product.image} alt={product.name} className="listproduct-product-icon" />
            {editingProductId === product._id ? (
              <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="addproduct-itemfield">
                  <label>Product Title</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                  <label>Price</label>
                  <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                  <label>Stock</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                </div>
                <div className="addproduct-itemfield">
                  <label>Product Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="SmartPhone">SmartPhone</option>
                    <option value="NoteBook">NoteBook</option>
                    <option value="SmartWacth">SmartWacth</option>
                    <option value="Komputer">Komputer</option>
                    <option value="TV">TV</option>
                    <option value="Aksesoris">Aksesoris</option>
                  </select>
                </div>
                <div className="addproduct-itemfield">
                  <label>Product Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="addproduct-itemfield">
                  <label htmlFor="file-input">
                    <img src={formData.image} className="addproduct-thumnail-img" alt="Upload" />
                  </label>
                  <input type="file" onChange={handleImageChange} name="image" id="file-input" hidden />
                </div>
                <button type="submit" className="addproduct-btn">Simpan</button>
                <button type="button" onClick={() => setEditingProductId(null)} className="addproduct-btn addproduct-remove-button">Batal</button>
              </form>
            ) : (
              <>
                <p>{product.name}</p>
                <p>Rp{parseInt(product.price).toLocaleString()}</p>
                <p>{product.category}</p>
                <p>{product.date}</p>
                <p>{product.stock}</p>
                <button onClick={() => editProduct(product)} className="listproduct-edit-button">
                  <img src={editIcon} alt="Edit" style={{ width: '16px', height: '16px' }} />
                </button>
                <button onClick={() => removeProduct(product._id)} className="listproduct-remove-button">
                  <img src={deleteIcon} alt="Hapus" style={{ width: '16px', height: '16px' }} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
