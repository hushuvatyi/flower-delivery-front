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
  error: string | null;
}

const initialState: ShopState = {
  shops: [],
  products: {},
  loading: false,
  error: null,
};

const shopsSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
      })
      .addCase(fetchShops.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load shops. Try again later.";
      })
      .addCase(fetchShopProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products[action.payload.shopId] = action.payload.products;
      })
      .addCase(fetchShopProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load shop products. Try again later.";
      });
  },
});

export default shopsSlice.reducer;
