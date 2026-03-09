import { useNavigate } from "react-router-dom";
import { useCoffeeContext } from "../context/CoffeeContext";
import CoffeeTable from "../components/tables/CoffeeTable";
import Button from "../components/common/Button";
import { useState } from "react";
import "../styles/components/pages/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { coffees, ingredients, loading } = useCoffeeContext();
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  // Calculate stats
  const totalCoffees = coffees.length;
  const totalIngredients = ingredients.length;
  const avgPrice = (
    coffees.reduce((sum, c) => sum + c.price, 0) / totalCoffees || 0
  ).toFixed(2);
  const mostExpensive = Math.max(...coffees.map((c) => c.price)).toFixed(2);

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            <span className="header-icon">📊</span>
            Coffee Dashboard
          </h1>
          <p className="header-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="header-actions">
          <Button
            variant="primary"
            onClick={() => navigate("/admin/add-coffee")}
            disabled={loading}
            className="action-btn"
          >
            <span className="btn-icon">➕</span>
            {loading ? "Loading..." : "Add New Coffee"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper coffee">
            <span className="stat-icon">☕</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Coffees</span>
            <span className="stat-value">{totalCoffees}</span>
            <span className="stat-trend positive">↑ 12% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper ingredient">
            <span className="stat-icon">🥤</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Ingredients</span>
            <span className="stat-value">{totalIngredients}</span>
            <span className="stat-trend">8 unique flavors</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper price">
            <span className="stat-icon">💰</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Average Price</span>
            <span className="stat-value">${avgPrice}</span>
            <span className="stat-trend">per coffee</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper premium">
            <span className="stat-icon">👑</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Premium</span>
            <span className="stat-value">${mostExpensive}</span>
            <span className="stat-trend">highest price</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <div
            className="action-card"
            onClick={() => navigate("/admin/add-coffee")}
          >
            <span className="action-card-icon">➕</span>
            <h3>Add Coffee</h3>
            <p>Create a new coffee blend</p>
          </div>
          <div
            className="action-card"
            onClick={() => navigate("/admin/ingredients")}
          >
            <span className="action-card-icon">🥤</span>
            <h3>Manage Ingredients</h3>
            <p>Add or edit ingredients</p>
          </div>
          <div
            className="action-card"
            onClick={() => (window.location.href = "/")}
          >
            <span className="action-card-icon">👥</span>
            <h3>View Store</h3>
            <p>See customer view</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === "table" ? "active" : ""}`}
          onClick={() => setViewMode("table")}
        >
          📋 Table View
        </button>
        <button
          className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          🖼️ Grid View
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your coffee collection...</p>
          </div>
        ) : (
          <>
            {viewMode === "table" ? (
              <CoffeeTable />
            ) : (
              <div className="coffee-grid-view">
                {coffees.map((coffee) => (
                  <div key={coffee.id} className="grid-card">
                    <img src={coffee.imageUrl} alt={coffee.name} />
                    <div className="grid-card-content">
                      <h3>{coffee.name}</h3>
                      <p>{coffee.origin}</p>
                      <span className="grid-price">${coffee.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
