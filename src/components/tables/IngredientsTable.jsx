import { useContext } from "react";
import { CoffeeContext } from "../../context/CoffeeContext";
import Button from "../common/Button";

const IngredientsTable = ({ onEdit, editingId }) => {
  const { ingredients, deleteIngredient } = useContext(CoffeeContext);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      deleteIngredient(id);
    }
  };

  if (ingredients.length === 0) {
    return (
      <div className="empty-state">
        <p>No ingredients yet. Add your first ingredient!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Strength</th>
            <th>Flavor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr
              key={ingredient.id}
              className={editingId === ingredient.id ? "table-row-editing" : ""}
            >
              <td>
                <strong>{ingredient.name}</strong>
              </td>
              <td>${ingredient.price.toFixed(2)}</td>
              <td>
                <span
                  className={`strength-badge strength-${ingredient.strength.toLowerCase()}`}
                >
                  {ingredient.strength}
                </span>
              </td>
              <td>
                <span className="flavor-badge">{ingredient.flavor}</span>
              </td>
              <td className="actions-cell">
                <button
                  className="action-btn edit"
                  onClick={() => onEdit(ingredient.id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientsTable;
