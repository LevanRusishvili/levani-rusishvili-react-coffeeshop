import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import "../styles/components/pages/add-coffee.css";

const AddCoffee = () => {
  const { addCoffee, ingredients } = useContext(CoffeeContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    caffeine: "",
    price: "",
    imageUrl: "",
    description: "",
    ingredients: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.origin.trim()) newErrors.origin = "Origin is required";
    if (!formData.caffeine.trim()) newErrors.caffeine = "Caffeine is required";
    if (!formData.price || isNaN(formData.price))
      newErrors.price = "Valid price is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addCoffee({
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients,
    });
    navigate("/admin/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "imageUrl") {
      setPreviewImage(value);
    }
  };

  const handleIngredientChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map((option) => option.value);
    setFormData((prev) => ({ ...prev, ingredients: selectedIds }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="add-coffee-page">
      <div className="add-coffee-header">
        <h1>
          <span className="header-icon">✨</span>
          Create New Coffee
        </h1>
        <p>Fill in the details to add a new coffee to your collection</p>
      </div>

      {/* Progress Steps */}
      <div className="progress-steps">
        <div
          className={`step ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}
        >
          <div className="step-number">{currentStep > 1 ? "✓" : "1"}</div>
          <span>Basic Info</span>
        </div>
        <div className={`step-line ${currentStep >= 2 ? "active" : ""}`}></div>
        <div
          className={`step ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}
        >
          <div className="step-number">{currentStep > 2 ? "✓" : "2"}</div>
          <span>Details</span>
        </div>
        <div className={`step-line ${currentStep >= 3 ? "active" : ""}`}></div>
        <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <span>Ingredients</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="add-coffee-form">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="form-step fade-in">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <Input
                label="Coffee Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="e.g., Ethiopian Yirgacheffe"
              />

              <Input
                label="Country of Origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                error={errors.origin}
                required
                placeholder="e.g., Ethiopia"
              />

              <Input
                label="Caffeine Content (mg)"
                name="caffeine"
                value={formData.caffeine}
                onChange={handleChange}
                error={errors.caffeine}
                required
                placeholder="e.g., 100mg"
              />

              <Input
                label="Base Price ($)"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
                placeholder="0.00"
              />
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <div className="form-step fade-in">
            <h2>Description & Image</h2>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                placeholder="Describe your coffee's flavor profile, aroma, and tasting notes..."
              />
            </div>

            <div className="form-group">
              <Input
                label="Image URL"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/coffee-image.jpg"
              />

              {previewImage && (
                <div className="image-preview-card">
                  <img src={previewImage} alt="Preview" />
                  <p>Image Preview</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Ingredients */}
        {currentStep === 3 && (
          <div className="form-step fade-in">
            <h2>Select Ingredients</h2>
            <p className="step-hint">
              Choose ingredients that make this coffee special
            </p>

            <div className="ingredients-selector">
              {ingredients.map((ingredient) => (
                <label key={ingredient.id} className="ingredient-option">
                  <input
                    type="checkbox"
                    value={ingredient.id}
                    checked={formData.ingredients.includes(ingredient.id)}
                    onChange={(e) => {
                      const selected = new Set(formData.ingredients);
                      if (e.target.checked) {
                        selected.add(ingredient.id);
                      } else {
                        selected.delete(ingredient.id);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        ingredients: Array.from(selected),
                      }));
                    }}
                  />
                  <div className="ingredient-card-select">
                    <h4>{ingredient.name}</h4>
                    <p>{ingredient.description}</p>
                    <div className="ingredient-tags">
                      <span className="tag-strength">
                        {ingredient.strength}
                      </span>
                      <span className="tag-flavor">{ingredient.flavor}</span>
                      <span className="tag-price">
                        +${ingredient.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {formData.ingredients.length > 0 && (
              <div className="selected-count">
                ✅ {formData.ingredients.length} ingredients selected
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <Button type="button" variant="secondary" onClick={prevStep}>
              ← Previous
            </Button>
          )}

          {currentStep < 3 ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              Next Step →
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="submit-btn">
              ✨ Create Coffee
            </Button>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCoffee;
