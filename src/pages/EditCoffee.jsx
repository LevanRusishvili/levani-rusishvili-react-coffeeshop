import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import "../styles/components/pages/add-coffee.css";
import "../styles/components/forms.css";

const EditCoffee = () => {
  const { updateCoffee, ingredients } = useContext(CoffeeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const coffeeToEdit = location.state?.coffee;

  const [formData, setFormData] = useState({
    name: coffeeToEdit?.name || "",
    origin: coffeeToEdit?.origin || "",
    caffeine: coffeeToEdit?.caffeine || "",
    price: coffeeToEdit?.price || "",
    imageUrl: coffeeToEdit?.imageUrl || "",
    description: coffeeToEdit?.description || "",
    ingredients: coffeeToEdit?.ingredients || [],
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

    if (coffeeToEdit) {
      updateCoffee(coffeeToEdit.id, {
        ...formData,
        price: parseFloat(formData.price),
        ingredients: formData.ingredients,
      });
    }

    navigate("/admin/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleIngredientChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map((option) => option.value);
    setFormData((prev) => ({ ...prev, ingredients: selectedIds }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{coffeeToEdit ? "Edit Coffee" : "Add New Coffee"}</h1>
        <Button variant="secondary" onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <Input
            label="Coffee Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Country of Origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            error={errors.origin}
            required
          />
        </div>

        <div className="form-row">
          <Input
            label="Caffeine Content (mg)"
            name="caffeine"
            value={formData.caffeine}
            onChange={handleChange}
            error={errors.caffeine}
            required
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
          {formData.imageUrl && (
            <div className="image-preview">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="preview-image"
              />
              <small>Image Preview</small>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <select
            id="ingredients"
            multiple
            value={formData.ingredients}
            onChange={handleIngredientChange}
            className="form-multiselect"
          >
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name} (${ingredient.price.toFixed(2)})
              </option>
            ))}
          </select>
          <small className="form-hint">
            Hold Ctrl/Cmd to select multiple ingredients
          </small>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            {coffeeToEdit ? "Update Coffee" : "Save Coffee"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCoffee;
