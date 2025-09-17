import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchShops = createAsyncThunk("shops/fetchAll", async () => {
  const res = await axios.get("/shops");
  return res.data;
});

export const fetchShopProducts = createAsyncThunk(
  "shops/fetchProducts",
  async (shopId: string) => {
    const res = await axios.get(`/shops/${shopId}/products`);
    return { shopId, products: res.data };
  }
);

interface Shop {
  id: string;
  name: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
}

interface Product {
  id: string;
  price: number;
  stock: number;
  catalogProduct: {
    catalogProductId: string;
    name: string;
    imageUrl: string;
  };
}

interface ShopState {
  shops: Shop[];
  products: Record<string, Product[]>;
  loading: boolean;
}

const initialState: ShopState = {
  shops: [],
  products: {},
  loading: false,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.products[action.payload.shopId] = action.payload.products;
      });
  },
});

export default shopsSlice.reducer;
