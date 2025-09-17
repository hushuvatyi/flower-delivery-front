import { Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderDetailsPage from "./pages/OrderDetailPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
