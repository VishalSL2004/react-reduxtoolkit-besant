import { useEffect, useState } from "react";

import "./ProductForm.css";
const initialForm = {
    title: "",
    price:"",
    description:"",
    image:"",
    category:"electronics"
}

function ProductForm({onSubmit, editingProduct, onCancel, isSubmitting}) {

    const [formData, setFormData] = useState(initialForm);

    useEffect(()=>{
        if(editingProduct){
            setFormData({
            title: editingProduct.title,
            price:editingProduct.price,
            description:editingProduct.description,
            image:editingProduct.image,
            category:editingProduct.category
        })
        }
        else{
            setFormData(initialForm);
        }
    },[editingProduct])

    //handle input change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            ...formData,
            price: Number(formData.price)
        }

        onSubmit(product)
    }



    return (

        <div className="form-container">

            <h2>
                {editingProduct ? "Update Product" : "Add New Product"}
            </h2>


            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Product Name</label>

                    <input
                        type="text"
                        name="title"
                        placeholder="Enter product name"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Price</label>

                    <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Image URL</label>

                    <input
                        type="url"
                        name="image"
                        placeholder="Enter image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        <option value="electronics">
                            Electronics
                        </option>

                        <option value="jewelery">
                            Jewelery
                        </option>

                        <option value="men's clothing">
                            Men's Clothing
                        </option>

                        <option value="women's clothing">
                            Women's Clothing
                        </option>

                    </select>

                </div>


                <div className="form-buttons">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >

                        {isSubmitting
                            ? "Please wait..."
                            : editingProduct
                                ? "Update Product"
                                : "Add Product"
                        }

                    </button>


                    {editingProduct && (

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                    )}

                </div>

            </form>

        </div>

    );

}

export default ProductForm;