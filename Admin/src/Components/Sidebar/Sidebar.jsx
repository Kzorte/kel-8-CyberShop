import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import Confirmorder from '../../assets/confirmorder.svg';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/admin/addproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to='/admin/listproduct' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to='/admin/confirmorder' style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={Confirmorder} alt="" />
          <p>Confirm Order</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
