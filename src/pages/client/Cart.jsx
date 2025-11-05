import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/client/CartContext";

const Cart = () => {
  const { cartItems, total, removeFromCart, clearCart, handlePurchase } =
    useContext(CartContext);
  const navigate = useNavigate();

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const thStyle = {
    padding: "15px",
    borderBottom: "2px solid #8B4513",
    backgroundColor: "#f8f8f8",
    textAlign: "left",
    fontWeight: "600",
    color: "#333",
  };

  const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #eee",
  };

  const removeButtonStyle = {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#8B4513",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Back to Menu
        </button>
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Your Cart ({total} items)</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Coffee</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Subtotal</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((coffee) => (
            <tr key={coffee.id}>
              <td style={tdStyle}>
                <strong>{coffee.name}</strong>
              </td>
              <td style={tdStyle}>${coffee.price.toFixed(2)}</td>
              <td style={tdStyle}>{coffee.quantity}</td>
              <td style={tdStyle}>
                <strong>${(coffee.price * coffee.quantity).toFixed(2)}</strong>
              </td>
              <td style={tdStyle}>
                <button
                  style={removeButtonStyle}
                  onClick={() => removeFromCart(coffee.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={handlePurchase}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Purchase
        </button>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "#8B4513",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
