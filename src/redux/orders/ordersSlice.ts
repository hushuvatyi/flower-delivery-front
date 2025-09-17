import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { type Order } from "../../types/interfaces";
import { getOrderById, getOrders } from "../../api/orders";

interface OrdersState {
  entities: Record<string, Order>;
  ids: string[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
};

export const fetchOrderById = createAsyncThunk<Order, string>(
  "orders/fetchById",
  async (id) => await getOrderById(id)
);

export const fetchOrders = createAsyncThunk<Order[]>(
  "orders/fetchAll",
  async () => await getOrders()
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      const order = action.payload;
      state.entities[order.id] = order;
      if (!state.ids.includes(order.id)) {
        state.ids.push(order.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
        if (!state.ids.includes(action.payload.id)) {
          state.ids.push(action.payload.id);
        }
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load order";
      })

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = {};
        state.ids = [];
        action.payload.forEach((order) => {
          state.entities[order.id] = order;
          state.ids.push(order.id);
        });
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load orders";
      });
  },
});

export const { addOrder } = ordersSlice.actions;

export const selectOrderById = (state: RootState, id: string) =>
  state.orders.entities[id];
export const selectOrders = (state: RootState) =>
  state.orders.ids.map((id) => state.orders.entities[id]);
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;

export default ordersSlice.reducer;
