import api from "./axios";
import type { CreateOrderPayload, Order } from "../types/interfaces";

export const createOrder = async (order: CreateOrderPayload) => {
  const response = await api.post("/orders", order);
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data;
};
