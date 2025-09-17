import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function Navbar() {
  const cartItemsCount = useAppSelector((state) => state.cart.items.length);

  return (
    <nav className="bg-pink-500 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
        🌸 Flower Delivery
      </Link>
      <div className="space-x-4">
        <Link to="/" className="font-semibold hover:underline">
          Shops
        </Link>
        <Link to="/cart" className="font-semibold hover:underline">
          Cart ({cartItemsCount})
        </Link>
        <Link to="/orders" className="font-semibold hover:underline">
          My orders
        </Link>
      </div>
    </nav>
  );
}
