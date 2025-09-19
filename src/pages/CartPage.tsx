import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartItemsList from "../components/cart/CartItemsList";
import CartForm from "../components/cart/CartForm";
import CartSummary from "../components/cart/CartSummary";
import type { OrderFormValues } from "../types/interfaces";
import { createOrder } from "../api/orders";
import { useNavigate } from "react-router-dom";
import DeliveryMap from "../components/DeliveryMap";

const CartFormSchema = Yup.object().shape({
  customerName: Yup.string().required("Enter your name"),
  customerPhone: Yup.string().required("Enter your phone number"),
  customerEmail: Yup.string().email("Invalid email address"),
  deliveryAddress: Yup.string().required("Enter delivery address"),
  otherRecipient: Yup.boolean(),
  deliveryName: Yup.string().when("otherRecipient", {
    is: true,
    then: (schema) => schema.required("Enter recipient's name"),
  }),
  deliveryPhone: Yup.string().when("otherRecipient", {
    is: true,
    then: (schema) => schema.required("Enter recipient's phone number"),
  }),
  // deliveryDate: Yup.string(),
});

export default function CartPage() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: OrderFormValues = {
    customerName: "Vin",
    customerPhone: "0507896542",
    customerEmail: "vin@mail.com",
    deliveryAddress: "",
    otherRecipient: false,
    deliveryName: "",
    deliveryPhone: "",
    message: "",
    deliveryDate: "",
  };

  if (cart.items.length === 0) {
    return <div className="p-6">Cart is empty. Please add some products.</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CartFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const orderData = {
            ...values,
            shopId: cart.shopId,
            items: cart.items.map((item) => ({
              shopProductId: item.id,
              quantity: item.quantity,
              unitPrice: item.price,
            })),
            total: cart.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          };

          if (!orderData.deliveryDate) {
            orderData.deliveryDate = new Date(
              Date.now() + 1000 * 60 * 60 * 24
            ).toISOString();
          }

          const createdOrder = await createOrder(orderData);
          createdOrder.otherRecipient = orderData.otherRecipient;

          navigate(`/orders/${createdOrder.id}`, { state: createdOrder });
        } catch (err) {
          console.error("Failed to create order:", err);
          alert("Failed to create order:");
        } finally {
          setSubmitting(false);
          dispatch({ type: "cart/clearCart" });
        }
      }}
    >
      {() => (
        <Form className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-6">
            <CartItemsList />
            <CartForm />
          </div>
          <div className="space-y-6">
            <CartSummary />
            <DeliveryMap />
          </div>
        </Form>
      )}
    </Formik>
  );
}
