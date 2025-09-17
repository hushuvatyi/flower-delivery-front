export interface OrderFormValues {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  otherRecipient: boolean;
  deliveryName: string;
  deliveryPhone: string;
  message: string;
  deliveryDate: string;
}

export interface CreateOrderPayload extends OrderFormValues {
  items: {
    shopProductId: string;

    quantity: number;
  }[];
  total: number;
  shopId?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  otherRecipient: boolean;
  deliveryName?: string;
  deliveryPhone?: string;
  message?: string;
  deliveryDate: string;
  orderItems: OrderItem[];
  items: OrderItem[];
  total: number;
  createdAt?: string;
}
