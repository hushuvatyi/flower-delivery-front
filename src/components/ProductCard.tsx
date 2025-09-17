import { useDispatch } from "react-redux";
import { addItem } from "../redux/cart/cartSlice";

interface CatalogProduct {
  name: string;
  imageUrl: string;
}

interface Product {
  id: string;
  price: number;
  catalogProduct: CatalogProduct;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.catalogProduct.name,
        price: product.price,
        image: product.catalogProduct.imageUrl,
        quantity: 1,
      })
    );
  };

  return (
    <div className="border rounded-lg p-2 shadow-md">
      <img
        src={product.catalogProduct.imageUrl}
        alt={product.catalogProduct.name}
        className="w-full h-40 object-cover"
      />
      <h3 className="font-bold">{product.catalogProduct.name}</h3>
      <p>{product.price} грн</p>
      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
