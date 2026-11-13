const BASE_URL = "https://fakestoreapi.com/products";

//GET ALL PRODUCTS
export const getProductsApi = async () => {
    const response = await fetch(BASE_URL);
    if(!response.ok){
        throw new Error("Failed to fetch products");
    }
    return await response.json();
}

//CREATE METHOD
export const createProductApi = async(product) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    if(!response.ok){
        throw new Error("Failed to create product");
    }
    return await response.json();
}

//UPDATE PRODUCT
export const updateProductApi = async(id, product) => {
    const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    })
    if(!response.ok){
        throw new Error("Failed to create product");
    }
    return await response.json();
}

//DELETE PRODUCT
export const deleteProductApi = async(id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
    if(!response.ok){
        throw new Error("Failed to create product");
    }
    return await response.json();
}