import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { NumericFormat } from 'react-number-format';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "NoteBook",
        price: "",
        stock: 0,
        description: ""
    });

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Membersihkan format harga dan stok
        const cleanedPrice = productDetails.price.replace(/Rp|,|\./g, ''); // Menghilangkan Rp dan tanda pemisah ribuan
        const cleanedStock = productDetails.stock; // Pastikan ini sudah numerik
    
        if (!productDetails.name || !image || !productDetails.category || isNaN(Number(cleanedPrice)) || isNaN(Number(cleanedStock))) {
          alert('Please fill all fields correctly.');
          return;
        }
    
        const formData = new FormData();
        formData.append('image', image);
    
        try {
          const uploadResp = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (!uploadResp.ok) {
            throw new Error('Failed to upload image');
          }
    
          const uploadData = await uploadResp.json();
    
          const productData = {
            name: productDetails.name,
            category: productDetails.category,
            image: uploadData.image_url,
            price: Number(cleanedPrice),
            stock: Number(cleanedStock),
            description: productDetails.description
          };
    
          const response = await fetch('http://localhost:3000/addproduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to add product: ${response.statusText}`);
          }
    
          alert('Product added successfully!');
          setProductDetails({ name: '', category: 'NoteBook', price: '', stock: 0, description: '' });
          setImage(null);
        } catch (error) {
          alert(error.message);
        }
    };
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={handleChange} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <NumericFormat 
                        value={productDetails.price}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        onValueChange={(values) => {
                            const { formattedValue } = values;
                            setProductDetails(prevState => ({
                                ...prevState,
                                price: formattedValue
                            }));
                        }}
                        className="input"
                        placeholder='Type Here'
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Stock</p>
                    <input value={productDetails.stock} onChange={handleChange} type="number" name="stock" placeholder='Type Here'/>
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={handleChange} name="category" className='add-product-selector'>
                    <option value="SmartPhone">SmartPhone</option>
                    <option value="NoteBook">NoteBook</option>
                    <option value="SmartWacth">SmartWacth</option>
                    <option value="Komputer">Komputer</option>
                    <option value="TV">TV</option>
                    <option value="Aksesoris">Aksesoris</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Description</p>
                <textarea value={productDetails.description} onChange={handleChange} name="description" placeholder='Type here'></textarea>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="Upload"/>
                </label>
                <input onChange={handleImageChange} type="file" name="image" id='file-input' hidden/>
            </div>
            <button onClick={handleSubmit} className='addproduct-btn'>ADD</button>
        </div>
    );
}

export default AddProduct;
