import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config";
import { CartItem } from "../../../pages/CartPage";

interface InitialState {
    cartData: CartItem[]
}

const initialState: InitialState = {
    cartData: []
}

export const fetchCart = createAsyncThunk("fetchCart", async () => {
    const response = await axios.get(`${config.BACKEND_ENDPOINT}/cart`, { withCredentials: true });
    if (response.data.cartItems) return response.data.cartItems;
    return [];
});

const postToBackend = async (data: CartItem) => {
    const response = await axios.post(`${config.BACKEND_ENDPOINT}/cart`, data, { withCredentials: true });
    console.log(response)
}
const deleteItemInBackend = async (productId: string) => {
    const response = await axios.delete(`${config.BACKEND_ENDPOINT}/cart/${productId}`, { withCredentials: true })
    return response.data;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            let found = false;
            let updatedQty;
            for (let i = 0; i < state.cartData.length; i++) {
                if (state.cartData[i].productId === action.payload.productId) {
                    found = true;
                    state.cartData[i].quantity += 1;
                    updatedQty = state.cartData[i].quantity;
                    break;
                }
            }
            if (!found) {
                state.cartData.push(action.payload);
            }
            const obj = {
                ...action.payload,
                quantity: updatedQty ? updatedQty : action.payload.quantity
            }
            postToBackend(obj);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            let index = 0;
            for (let i = 0; i < state.cartData.length; i++) {
                console.log(state.cartData[i].productId, action.payload)
                if (state.cartData[i].productId === action.payload) {
                    index = i;
                    state.cartData[i].quantity += 1;
                    break;
                }
            }
            postToBackend(state.cartData[index]);
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            let index = 0;
            for (let i = 0; i < state.cartData.length; i++) {
                if (state.cartData[i].productId === action.payload) {
                    index = i;
                    state.cartData[i].quantity -= 1;
                    break;
                }
            }
            postToBackend(state.cartData[index]);
        },
        deleteItemFromCart: (state, action: PayloadAction<string>) => {
            const filteredProducts = [];
            for (let i = 0; i < state.cartData.length; i++) {
                if (state.cartData[i].productId !== action.payload) {
                    filteredProducts.push(state.cartData[i]);
                }
            }
            state.cartData = filteredProducts;
            console.log(filteredProducts);
            deleteItemInBackend(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartData = action.payload;
        })
    }
})

export default cartSlice;