import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { createProductApi, getProductsApi } from './services/productApi';
import ProductForm from './components/ProductForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import {addProduct, editProduct, fetchProducts} from "../src/features/products/productSlice"
import ProductList from './components/ProductList/ProductList';

function App() {
  const dispatch = useDispatch();
  const [editingProduct, setEditingProduct] = useState(null);

  const {mutationStatus} = useSelector(
    (state) => state.products
  )

  useEffect(()=>{
    dispatch(fetchProducts());
  },[])

  const handleSubmit = async(product) => {
    try{
      if(editingProduct){
        await dispatch(editProduct({
          id: editingProduct.id,
          product
        })).unwrap()
        alert("Product updated successfully!");
        setEditingProduct(null);
      }
      else{
        await dispatch(addProduct(product)).unwrap()
      }
    }catch(error){
      alert(error || "Something went wrong");
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
  }
  return (
    <div className=''>
      <header>
        <h1>Product Management System</h1>
        <p>React + Reduc Toolkit + Fakestore api</p>
      </header>
      <main>
        <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} onCancel={handleCancel} isSubmitting={mutationStatus==="loading"}/>
      </main>
    </div>
  );
}

export default App;
