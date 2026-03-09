import { useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../../context/CoffeeContext";
import "../../styles/components/tables.css";

const CoffeeTable = () => {
  const { coffees, deleteCoffee } = useCoffeeContext();
  const navigate = useNavigate();

  const handleView = (coffee) => {
    navigate("/admin/coffee-details", { state: { coffee } });
  };

  const handleEdit = (coffee) => {
    navigate("/admin/edit-coffee", { state: { coffee } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coffee?")) {
      deleteCoffee(id);
    }
  };

  if (coffees.length === 0) {
    return (
      <div className="empty-state">
        <p>No coffees yet. Add your first coffee!</p>
      </div>
    );
  }

  return (
    <div className="coffee-table-container">
      <table className="coffee-data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Caffeine</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((coffee) => (
            <tr key={coffee.id}>
              <td className="image-cell">
                <img
                  src={coffee.imageUrl}
                  alt={coffee.name}
                  className="table-coffee-image"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop";
                  }}
                />
              </td>
              <td>
                <strong>{coffee.name}</strong>
              </td>
              <td>{coffee.origin}</td>
              <td>{coffee.caffeine}</td>
              <td className="price-cell">${coffee.price.toFixed(2)}</td>
              <td className="actions-cell">
                <button
                  className="table-action-btn view"
                  onClick={() => handleView(coffee)}
                >
                  👁️ View
                </button>
                <button
                  className="table-action-btn edit"
                  onClick={() => handleEdit(coffee)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="table-action-btn delete"
                  onClick={() => handleDelete(coffee.id)}
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

export default CoffeeTable;
