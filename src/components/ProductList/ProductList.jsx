import { useSelector, useDispatch } from "react-redux";

import { removeProduct } from "../../features/products/productSlice";

import ProductCard from "../ProductCard/ProductCard";

import "./ProductList.css";

function ProductList({ onEdit }) {

    const dispatch = useDispatch();

    const {
        products,
        status,
        error,
        mutationStatus
    } = useSelector((state) => state.products);


    // DELETE PRODUCT

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (confirmDelete) {

            dispatch(removeProduct(id));

        }

    };


    // LOADING

    if (status === "loading") {

        return <h3 className="message">Loading products...</h3>;

    }


    // ERROR

    if (status === "failed") {

        return <h3 className="error">{error}</h3>;

    }


    return (

        <div className="product-list-container">

            <h2>Available Products</h2>

            {mutationStatus === "loading" && (
                <p>Processing your request...</p>
            )}

            {mutationStatus === "failed" && (
                <p className="error">{error}</p>
            )}

            {products.length === 0 ? (

                <p>No products available.</p>

            ) : (

                <div className="product-grid">

                    {products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={onEdit}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}

        </div>

    );

}

export default ProductList;