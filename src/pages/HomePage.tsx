import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchShops, fetchShopProducts } from "../redux/shops/shposSlice";
import ProductCard from "../components/ProductCard";
import { setShopId } from "../redux/cart/cartSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { shops, products } = useAppSelector((state) => state.shops);

  const cartItemsCount = useAppSelector((state) => state.cart.items.length);
  const selectedShop = useAppSelector((state) => state.cart.shopId);
  const loading = useAppSelector((state) => state.shops.loading);
  const error = useAppSelector((state) => state.shops.error);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  useEffect(() => {
    if (selectedShop && !products[selectedShop]) {
      dispatch(fetchShopProducts(selectedShop));
    }
  }, [selectedShop, products, dispatch]);

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

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="font-bold mb-2">Shops</h2>
        <ul>
          {shops.map((shop) => (
            <li key={shop.id}>
              <button
                onClick={() => {
                  if (cartItemsCount > 0 && shop.id !== selectedShop) {
                    alert(
                      "You have items in your cart. Please end your shopping before switching shops."
                    );
                    return;
                  }
                  dispatch(setShopId(shop.id));
                }}
                className="hover:underline"
              >
                <p className={shop.id === selectedShop ? "font-bold" : ""}>
                  {shop.name}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4 grid grid-cols-3 gap-4">
        {selectedShop &&
          products[selectedShop]?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>
    </div>
  );
}
