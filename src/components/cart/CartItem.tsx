import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../redux/cart/cartSlice";

type CartItemProps = {
  id: string;

  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartItem({
  id,

  name,
  image,
  price,
  quantity,
}: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center gap-4 border-b pb-4">
      <img src={image} alt={name} className="w-16 h-16 object-cover rounded" />

      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-600">{price} грн</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              dispatch(updateQuantity({ id, quantity: Number(e.target.value) }))
            }
            className="w-16 border rounded p-1 text-center"
          />
          <button
            onClick={() => dispatch(removeItem(id))}
            className="text-red-500 hover:underline text-sm"
          >
            Видалити
          </button>
        </div>
      </div>

      <p className="font-bold">{price * quantity} грн</p>
    </li>
  );
}
