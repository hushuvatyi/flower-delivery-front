import { useAppSelector } from "../../app/hooks";
import { useFormikContext } from "formik";
import type { OrderFormValues } from "../../types/interfaces";

export default function CartSummary() {
  const cart = useAppSelector((state) => state.cart);
  const { isSubmitting } = useFormikContext<OrderFormValues>();

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Summary</h2>
      <ul className="space-y-2">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{item.price * item.quantity} ₴</span>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex justify-between font-bold">
        <span>In total:</span>
        <span>{total} ₴</span>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {isSubmitting ? "Processing..." : "Confirm the order"}
      </button>
    </div>
  );
}
