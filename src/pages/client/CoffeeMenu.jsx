import { useContext } from "react";
import { CoffeeContext } from "../../context/CoffeeContext";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/client/CartContext";
import "../../styles/components/message.css";

const CoffeeMenu = () => {
  const { coffees } = useContext(CoffeeContext);
  const { messages, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddCart = (coffee) => {
    console.log("Added to cart:", coffee);
    addToCart(coffee);
  };

  const handleCoffeeDetails = (coffee) => {
    console.log("Show details:", coffee);
    navigate("/details", { state: { coffee } });
  };

  return (
    <div className="page-container">
      <h1>Coffee Selection</h1>

      {/* ✅ All messages in the EXACT SAME position */}
      {messages.map((msg) => (
        <p
          key={msg.id}
          className="info-message"
          style={{ top: "20px" }} // ✅ ALL messages in the same position
        >
          {msg.text}
        </p>
      ))}

      <div className="coffee-cards">
        {coffees.map((coffee) => (
          <div key={coffee.id} className="coffee-card">
            <img
              src={coffee.imageUrl}
              alt={coffee.name}
              className="coffee-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200/8B4513/FFFFFF?text=No+Image";
              }}
            />
            <h3>{coffee.name}</h3>
            <p className="coffee-description">{coffee.description}</p>
            <p>${coffee.price.toFixed(2)}</p>

            <div className="card-actions">
              <Button variant="primary" onClick={() => handleAddCart(coffee)}>
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleCoffeeDetails(coffee)}
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeMenu;
