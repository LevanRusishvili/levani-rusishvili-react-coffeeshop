import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CoffeeContext } from "../context/CoffeeContext";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import IngredientsTable from "../components/tables/IngredientsTable";
import "../styles/components/pages/ingredients.css";
import "../styles/components/forms.css";
import "../styles/components/tables.css";

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

  //------------------------for-form-submit----------------------------------------------------------
  const validate = () => {
    //for errors
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
    const validationErrors = validate(); //if errors, stop here
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingId) {
      // Update existing ingredient
      handleEditIngredient(editingId, {
        ...formData,
        price: parseFloat(formData.price),
      });
      setEditingId(null); // Exit edit mode
    } else {
      // Add new ingredient
      addIngredient({
        ...formData,
        price: parseFloat(formData.price),
      });
    }

    // Reset form after new ingredient gets added to the list
    setFormData({
      name: "",
      price: "",
      description: "",
      strength: "Medium",
      flavor: "",
    });
  };
  //----------------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Add this function - handles edit button click
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

  // Add this function - cancel edit mode
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
    <div className="page-container">
      <div className="page-header">
        <h1>Manage Ingredients</h1>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="ingredients-container split-layout">
        <div className={`ingredients-form ${editingId ? "editing" : ""}`}>
          <h2>
            {editingId ? "Edit Ingredient" : "Add New Ingredient"}
            {editingId && <span className="edit-indicator">Editing Mode</span>}
          </h2>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-row">
              <Input
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
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
              />

              <Input
                label="Description"
                name="description"
                type="string"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="strength">Strength</label>
              <select
                id="strength"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="flavor">Flavor Profile</label>
              <input
                id="flavor"
                type="text"
                name="flavor"
                value={formData.flavor}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="primary">
                {editingId ? "Update Ingredient" : "Add Ingredient"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="ingredients-list">
          <IngredientsTable onEdit={handleEdit} editingId={editingId} />
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
