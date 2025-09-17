import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addOrder,
  fetchOrderById,
  selectOrderById,
  selectOrdersError,
  selectOrdersLoading,
} from "../redux/orders/ordersSlice";
import { type Order } from "../types/interfaces";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const orderFromState = location.state as Order | undefined;
  const order = useAppSelector((state) =>
    id ? selectOrderById(state, id) : undefined
  );
  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  useEffect(() => {
    if (orderFromState) {
      dispatch(addOrder(orderFromState));
    } else if (id && !order) {
      dispatch(fetchOrderById(id));
    }
  }, [id, orderFromState, order, dispatch]);

  if (loading && !order) {
    return <div className="p-6">Loading...</div>;
  }

  if (error && !order) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Customer data</h2>
        <p>
          <strong>Name:</strong> {order.customerName}
        </p>
        <p>
          <strong>Phone number:</strong> {order.customerPhone}
        </p>
        <p>
          <strong>Address:</strong> {order.deliveryAddress}
        </p>

        {order.otherRecipient && (
          <>
            <p>
              <strong>Recipient's name:</strong> {order.deliveryName}
            </p>
            <p>
              <strong>Recipient's phone number:</strong> {order.deliveryPhone}
            </p>
          </>
        )}

        {order.message && (
          <p>
            <strong>Message for recipient:</strong> {order.message}
          </p>
        )}
        <p>
          <strong>Delivery date:</strong> {order.deliveryDate}
        </p>
        {order.createdAt && (
          <p>
            <strong>Created:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Goods</h2>
        <ul className="divide-y">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{item.price * item.quantity} ₴ </span>
            </li>
          ))}
        </ul>
        <p className="text-right font-bold text-lg">Total: {order.total} ₴</p>
      </section>
    </div>
  );
}
