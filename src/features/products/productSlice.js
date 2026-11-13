import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductApi, deleteProductApi, getProductsApi, updateProductApi } from "../../services/productApi";

const initialState = {
    products: [],
    status: "idle",
    mutationStatus: "idle",
    error: null
}
//get all products
export const fetchProducts = createAsyncThunk(
    "prodcts/fetchProducts",
    async(_, {rejectWithValue}) => {
        try{
            const data = await getProductsApi();
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

//create products
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async(product, {rejectWithValue}) => {
        try{
            const data = await createProductApi(product);
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

//udpate product
export const editProduct = createAsyncThunk(
    "products/editProduct",
    async({id, product}, {rejectWithValue}) => {
        try{
            const data = await updateProductApi(id, product);
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

//delete products
export const removeProduct = createAsyncThunk(
    "products/removeProduct",
    async(id, {rejectWithValue}) => {
        try{
            const data = await deleteProductApi(id);
            return data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        //GET PRODUCTS
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = "loading"
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })

        //CREATE PRODUCT
        builder
        .addCase(addProduct.pending, (state) => {
            state.mutationStatus = "loading";
            state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.mutationStatus = "succeeded";
            state.products.unshift(action.payload)
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.mutationStatus = "failed";
            state.error = action.payload;
        })

        //UPDATE PRODUCT
        builder
        .addCase(editProduct.pending, (state) => {
            state.mutationStatus = "loading";
            state.error = null;
        })
        .addCase(editProduct.fulfilled, (state, action) => {
            state.mutationStatus = "succeeded";
            const index = state.products.findIndex((product) => product.id === action.payload.id)
            if(index !== -1){
                state.products[index] = {
                    ...state.products[index],
                    ...action.payload
                }
            }
        })
        .addCase(editProduct.rejected, (state, action) => {
            state.mutationStatus = "failed";
            state.error = action.payload;
        })

        //DELETE PRODUCT
        builder
        .addCase(removeProduct.pending, (state) => {
            state.mutationStatus = "loading";
            state.error = null;
        })
        .addCase(removeProduct.fulfilled, (state, action) => {
            state.mutationStatus = "succeeded";
            state.products = state.products.filter((product) => product.id !== action.payload);
        })
        .addCase(removeProduct.rejected, (state, action) => {
            state.mutationStatus = "failed";
            state.error = action.payload;
        })
    }
})

export default productSlice.reducer;
