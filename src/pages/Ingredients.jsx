import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import IngredientsTable from "../components/tables/IngredientsTable";
import "../styles/components/pages/ingredients.css";

const Ingredients = () => {
  const { addIngredient, handleEditIngredient, ingredients } =
    useContext(CoffeeContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    strength: "Medium",
    flavor: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
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

    if (editingId) {
      handleEditIngredient(editingId, {
        ...formData,
        price: parseFloat(formData.price),
      });
      setEditingId(null);
    } else {
      addIngredient({
        ...formData,
        price: parseFloat(formData.price),
      });
    }

    setFormData({
      name: "",
      price: "",
      description: "",
      strength: "Medium",
      flavor: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEdit = (id) => {
    const ingredientToEdit = ingredients.find((ing) => ing.id === id);
    if (ingredientToEdit) {
      setFormData({
        name: ingredientToEdit.name,
        price: ingredientToEdit.price.toString(),
        strength: ingredientToEdit.strength,
        description: ingredientToEdit.description,
        flavor: ingredientToEdit.flavor,
      });
      setEditingId(id);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      strength: "Medium",
      flavor: "",
    });
  };

  return (
    <div className="ingredients-page">
      {/* Header */}
      <div className="ingredients-header">
        <div>
          <h1>
            <span className="header-icon">🥤</span>
            Ingredients
          </h1>
          <p className="header-subtitle">Manage your coffee ingredients</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="ingredients-layout">
        {/* Form Card */}
        <div className={`ingredients-form-card ${editingId ? "editing" : ""}`}>
          <div className="form-card-header">
            <h2>
              {editingId ? <>✏️ Edit Ingredient</> : <>➕ Add New Ingredient</>}
            </h2>
            {editingId && <span className="editing-badge">Editing Mode</span>}
          </div>

          <form onSubmit={handleSubmit} className="ingredients-form">
            <div className="form-grid">
              <Input
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="e.g., Arabica Beans"
              />

              <Input
                label="Price ($)"
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

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                placeholder="Describe this ingredient..."
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Strength</label>
                <select
                  name="strength"
                  value={formData.strength}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Low">🌱 Low</option>
                  <option value="Medium">🌿 Medium</option>
                  <option value="High">🌳 High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Flavor Profile</label>
                <input
                  type="text"
                  name="flavor"
                  value={formData.flavor}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Fruity, Nutty, Sweet"
                />
              </div>
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                {editingId ? "✏️ Update Ingredient" : "➕ Add Ingredient"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div className="ingredients-table-card">
          <div className="table-card-header">
            <h2>🥤 Ingredients List</h2>
            <span className="ingredient-count">{ingredients.length} total</span>
          </div>
          <IngredientsTable onEdit={handleEdit} editingId={editingId} />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
