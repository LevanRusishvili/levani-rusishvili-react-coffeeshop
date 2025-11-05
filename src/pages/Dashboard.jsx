import { useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../context/CoffeeContext";
import CoffeeTable from "../components/tables/CoffeeTable";
import Button from "../components/common/Button";
import "../styles/components/pages/dashboard.css";
import "../styles/components/tables.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { loading } = useCoffeeContext();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Coffee Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => navigate("/admin/add-coffee")}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Coffee"}
        </Button>
      </div>

      <div className="page-content">
        {loading ? (
          <div className="loading-state">
            <p>Loading coffee data...</p>
          </div>
        ) : (
          <CoffeeTable />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
