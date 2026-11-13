import "./ProductCard.css";

function ProductCard({ product, onEdit, onDelete }) {

    return (

        <div className="product-card">

            <img
                src={product.image}
                alt={product.title}
            />

            <h3>{product.title}</h3>

            <p className="category">
                {product.category}
            </p>

            <h4>${product.price}</h4>

            <p className="description">
                {product.description}
            </p>

            <div className="card-buttons">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(product)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default ProductCard;