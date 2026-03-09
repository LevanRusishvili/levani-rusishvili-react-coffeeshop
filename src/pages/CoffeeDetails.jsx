import { useLocation, useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import { useState } from "react";
import "../styles/components/pages/coffee-details.css";
const CoffeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients, deleteCoffee } = useCoffeeContext();
  const [activeTab, setActiveTab] = useState("details"); // 'details' or 'ingredients'
  const [showFullDesc, setShowFullDesc] = useState(false);

  const coffee = location.state?.coffee;

  if (!coffee) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>☕ Coffee not found</h2>
          <p>The coffee you're looking for doesn't exist or was removed.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleEditCoffee = () => {
    navigate("/admin/edit-coffee", { state: { coffee } });
  };

  const handleDeleteCoffee = () => {
    if (window.confirm(`Are you sure you want to delete ${coffee.name}?`)) {
      deleteCoffee(coffee.id);
      navigate("/admin/dashboard");
    }
  };

  // Calculate total price with ingredients
  const ingredientsTotal = coffee.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredients.find((ing) => ing.id === ingredientId);
    return total + (ingredient?.price || 0);
  }, 0);

  const totalPrice = (parseFloat(coffee.price) + ingredientsTotal).toFixed(2);

  // Get ingredient details
  const coffeeIngredients = coffee.ingredients
    .map((id) => ingredients.find((ing) => ing.id === id))
    .filter(Boolean);

  return (
    <div className="coffee-details-page">
      {/* Hero Section with Image */}
      <div
        className="coffee-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${coffee.imageUrl || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=400&fit=crop"})`,
        }}
      >
        <div className="hero-content">
          <h1>{coffee.name}</h1>
          <div className="coffee-badges">
            <span className="badge origin">{coffee.origin}</span>
            <span className="badge caffeine">{coffee.caffeine}</span>
            <span className="badge price">
              ${parseFloat(coffee.price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="details-container">
        {/* Tab Navigation */}
        <div className="details-tabs">
          <button
            className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            📋 Details
          </button>
          <button
            className={`tab-btn ${activeTab === "ingredients" ? "active" : ""}`}
            onClick={() => setActiveTab("ingredients")}
          >
            🥤 Ingredients ({coffeeIngredients.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "details" && (
            <div className="details-tab">
              {/* Description */}
              <div className="description-card">
                <h2>📝 Description</h2>
                <p className={showFullDesc ? "full" : "truncated"}>
                  {coffee.description ||
                    "No description available for this coffee."}
                </p>
                {coffee.description?.length > 150 && (
                  <button
                    className="read-more-btn"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              {/* Quick Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-icon">🌍</span>
                  <span className="stat-label">Origin</span>
                  <span className="stat-value">{coffee.origin}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-label">Caffeine</span>
                  <span className="stat-value">{coffee.caffeine}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">💰</span>
                  <span className="stat-label">Base Price</span>
                  <span className="stat-value">
                    ${parseFloat(coffee.price).toFixed(2)}
                  </span>
                </div>
                <div className="stat-card highlight">
                  <span className="stat-icon">💎</span>
                  <span className="stat-label">Total Value</span>
                  <span className="stat-value">${totalPrice}</span>
                </div>
              </div>

              {/* Ingredients Preview */}
              {coffeeIngredients.length > 0 && (
                <div className="ingredients-preview">
                  <h3>✨ Key Ingredients</h3>
                  <div className="preview-list">
                    {coffeeIngredients.slice(0, 3).map((ing) => (
                      <div key={ing.id} className="preview-item">
                        <span className="preview-name">{ing.name}</span>
                        <span className="preview-flavor">{ing.flavor}</span>
                      </div>
                    ))}
                    {coffeeIngredients.length > 3 && (
                      <div className="preview-more">
                        +{coffeeIngredients.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="ingredients-tab">
              <h2>🥤 Ingredients Breakdown</h2>
              {coffeeIngredients.length === 0 ? (
                <div className="no-ingredients">
                  <p>No ingredients added to this coffee.</p>
                </div>
              ) : (
                <div className="ingredients-grid">
                  {coffeeIngredients.map((ing) => (
                    <div key={ing.id} className="ingredient-detail-card">
                      <div className="ingredient-header">
                        <h3>{ing.name}</h3>
                        <span className="ingredient-price">
                          ${ing.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="ingredient-desc">{ing.description}</p>
                      <div className="ingredient-tags">
                        <span className="tag strength">{ing.strength}</span>
                        <span className="tag flavor">{ing.flavor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="price-summary">
                <h3>💰 Price Calculation</h3>
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Base Coffee:</span>
                    <span>${parseFloat(coffee.price).toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Ingredients ({coffeeIngredients.length} items):</span>
                    <span>+${ingredientsTotal.toFixed(2)}</span>
                  </div>
                  <div className="price-row total">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="details-actions">
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Back to Dashboard
          </Button>
          <div className="action-group">
            <Button variant="primary" onClick={handleEditCoffee}>
              ✏️ Edit Coffee
            </Button>
            <Button variant="danger" onClick={handleDeleteCoffee}>
              🗑️ Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
