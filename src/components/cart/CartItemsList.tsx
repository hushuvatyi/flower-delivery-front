import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store";
import CartItem from "./CartItem";

export default function CartItemsList() {
  const items = useSelector((state: RootState) => state.cart.items);

  if (items.length === 0) {
    return <p className="text-gray-500">Cart is empty</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Your goods</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
