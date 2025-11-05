import { useLocation, useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import "../styles/components/pages/coffee-details.css";

const CoffeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = useCoffeeContext();

  const coffee = location.state?.coffee;

  // If no coffee data was passed, redirect back
  if (!coffee) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Coffee not found</h2>
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

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{coffee.name} Details</h1>
        <Button variant="secondary" onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <div className="coffee-details-content">
        {/* Coffee Details Section */}
        <div className="details-section">
          <h2>Coffee Information</h2>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Name:</strong>
              <span>{coffee.name}</span>
            </div>
            <div className="detail-item">
              <strong>Origin:</strong>
              <span>{coffee.origin}</span>
            </div>
            <div className="detail-item">
              <strong>Caffeine Content:</strong>
              <span>{coffee.caffeine} mg</span>
            </div>
            <div className="detail-item">
              <strong>Price:</strong>
              <span>${parseFloat(coffee.price).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="description-section">
          <h2>Description</h2>
          <p>{coffee.description || "No description available."}</p>
        </div>

        {/* Ingredients Section */}
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <div className="ingredients-list">
            {coffee.ingredients.length === 0 ? (
              <p>No ingredients added.</p>
            ) : (
              coffee.ingredients.map((ingredientId) => {
                const ingredient = ingredients.find(
                  (ing) => ing.id === ingredientId
                );
                return ingredient ? (
                  <div key={ingredient.id} className="ingredient-card">
                    <h3>{ingredient.name}</h3>
                    <div className="ingredient-properties">
                      <span className="property">
                        <strong>Strength:</strong> {ingredient.strength}
                      </span>
                      <span className="property">
                        <strong>Flavor:</strong> {ingredient.flavor}
                      </span>
                      <span className="property">
                        <strong>Price:</strong> ${ingredient.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : null;
              })
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button variant="primary" onClick={handleEditCoffee}>
            Edit Coffee
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this coffee?")
              ) {
                // You might need to add delete function here or navigate back
                navigate("/admin/dashboard");
              }
            }}
          >
            Delete Coffee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
