import { useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../../context/CoffeeContext";
import Button from "../common/Button";
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

  return (
    <div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{coffee.id}</td>
                <td>{coffee.name}</td>
                <td>{coffee.origin}</td>
                <td>{coffee.caffeine}</td>
                <td>${coffee.price.toFixed(2)}</td>
                <td className="actions-cell">
                  <Button variant="primary" onClick={() => handleView(coffee)}>
                    View
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(coffee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(coffee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="coffee-cards-container">
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
              <div className="coffee-details">
                <p>
                  <strong>Origin:</strong> {coffee.origin}
                </p>
                <p>
                  <strong>Caffeine:</strong> {coffee.caffeine}mg
                </p>
                <p>
                  <strong>Price:</strong> ${coffee.price.toFixed(2)}
                </p>
              </div>
              <div className="card-actions">
                <Button variant="primary" onClick={() => handleView(coffee)}>
                  View Details
                </Button>
                <Button variant="secondary" onClick={() => handleEdit(coffee)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(coffee.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeTable;
