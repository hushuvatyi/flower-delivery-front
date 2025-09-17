import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchOrders,
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from "../redux/orders/ordersSlice";

export default function OrderHistoryPage() {
  const dispatch = useAppDispatch();
  const memoSelectOrders = useMemo(() => selectOrders, []);
  const orders = useAppSelector(memoSelectOrders);
  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!orders.length) {
    return <div className="p-6">You haven't orders yet</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My orders</h1>

      <ul className="divide-y">
        console.log(orders);
        {orders.map((order) => (
          <li key={order.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt || "").toLocaleString()} —{" "}
                {order.orderItems.length} item(s), total {order.total} ₴
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="text-blue-600 hover:underline"
            >
              Review
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
