import { Field, useFormikContext } from "formik";
import type { OrderFormValues } from "../../types/interfaces";

export default function CartForm() {
  const { values, errors, touched } = useFormikContext<OrderFormValues>();

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Customer data</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <Field name="customerName" className="w-full border rounded p-2" />
          {errors.customerName && touched.customerName && (
            <div className="text-red-500 text-sm">{errors.customerName}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Phone</label>
          <Field name="customerPhone" className="w-full border rounded p-2" />
          {errors.customerPhone && touched.customerPhone && (
            <div className="text-red-500 text-sm">{errors.customerPhone}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Field name="customerEmail" className="w-full border rounded p-2" />
          {errors.customerEmail && touched.customerEmail && (
            <div className="text-red-500 text-sm">{errors.customerEmail}</div>
          )}
        </div>

        <div>
          <label className="block mb-1">Delivery address</label>
          <Field name="deliveryAddress" className="w-full border rounded p-2" />
          {errors.deliveryAddress && touched.deliveryAddress && (
            <div className="text-red-500 text-sm">{errors.deliveryAddress}</div>
          )}
        </div>

        <div>
          <label className="inline-flex items-center">
            <Field type="checkbox" name="otherRecipient" className="mr-2" />
            Other recipient
          </label>
        </div>

        {values.otherRecipient && (
          <>
            <div>
              <label className="block mb-1">Recipient's name</label>
              <Field
                name="deliveryName"
                className="w-full border rounded p-2"
              />
              {errors.deliveryName && touched.deliveryName && (
                <div className="text-red-500 text-sm">
                  {errors.deliveryName}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">Recipient's phone number</label>
              <Field
                name="deliveryPhone"
                className="w-full border rounded p-2"
              />
              {errors.deliveryPhone && touched.deliveryPhone && (
                <div className="text-red-500 text-sm">
                  {errors.deliveryPhone}
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1">Message for recipient</label>
              <Field
                as="textarea"
                name="message"
                className="w-full border rounded p-2"
              />
            </div>
          </>
        )}

        <div>
          <label className="block mb-1">Delivery date</label>
          <Field
            type="datetime-local"
            name="deliveryDate"
            className="w-full border rounded p-2"
          />
          {errors.deliveryDate && touched.deliveryDate && (
            <div className="text-red-500 text-sm">{errors.deliveryDate}</div>
          )}
        </div>
      </div>
    </div>
  );
}
