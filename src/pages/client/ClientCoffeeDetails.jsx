import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/client/CartContext";
import Button from "../../components/common/Button";
import "../../styles/components/pages/client-coffee-details.css";

const ClientCoffeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("details");
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const coffee = location.state?.coffee;

  if (!coffee) {
    return (
      <div className="client-error-state">
        <h2>☕ Coffee Not Found</h2>
        <p>The coffee you're looking for doesn't exist.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Menu
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(coffee);
    }
    navigate("/cart");
  };

  return (
    <div className="client-coffee-page">
      {/* Hero Section */}
      <div
        className="client-coffee-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${coffee.imageUrl || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop"})`,
        }}
      >
        <div className="client-hero-content">
          <h1>{coffee.name}</h1>
          <div className="client-badges">
            <span className="client-badge origin">{coffee.origin}</span>
            <span className="client-badge caffeine">{coffee.caffeine}</span>
            <span className="client-badge price">
              ${coffee.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="client-details-container">
        {/* Quick Stats */}
        <div className="client-quick-stats">
          <div className="client-stat">
            <span className="stat-icon">🌍</span>
            <span className="stat-label">Origin</span>
            <span className="stat-value">{coffee.origin}</span>
          </div>
          <div className="client-stat">
            <span className="stat-icon">⚡</span>
            <span className="stat-label">Caffeine</span>
            <span className="stat-value">{coffee.caffeine}</span>
          </div>
          <div className="client-stat">
            <span className="stat-icon">💰</span>
            <span className="stat-label">Price</span>
            <span className="stat-value">${coffee.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="client-tabs">
          <button
            className={`client-tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            📝 Description
          </button>
          <button
            className={`client-tab ${activeTab === "ingredients" ? "active" : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            🧪 Ingredients
          </button>
        </div>

        {/* Tab Content */}
        <div className="client-tab-content">
          {activeTab === "details" && (
            <div className="client-description">
              <p className={showFullDesc ? "" : "truncated"}>
                {coffee.description ||
                  "No description available for this coffee."}
              </p>
              {coffee.description?.length > 200 && (
                <button
                  className="client-read-more"
                  onClick={() => setShowFullDesc(!showFullDesc)}
                >
                  {showFullDesc ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="client-ingredients">
              {coffee.ingredients?.length > 0 ? (
                coffee.ingredients.map((ing, index) => (
                  <div key={index} className="client-ingredient-item">
                    <span className="ingredient-dot">•</span>
                    <span>{ing}</span>
                  </div>
                ))
              ) : (
                <p>No ingredients listed</p>
              )}
            </div>
          )}
        </div>

        {/* Purchase Section */}
        <div className="client-purchase-section">
          <div className="client-quantity">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-number">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="client-total">
            <span>Total:</span>
            <span className="total-price">
              ${(coffee.price * quantity).toFixed(2)}
            </span>
          </div>

          <div className="client-actions">
            <Button variant="secondary" onClick={() => navigate("/")}>
              ← Back to Menu
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              🛒 Add to Cart ({quantity})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCoffeeDetails;
