import { useContext, useState } from "react";
import { CoffeeContext } from "../../context/CoffeeContext";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/client/CartContext";
import "../../styles/components/pages/coffee-menu.css";

const CoffeeMenu = () => {
  const { coffees } = useContext(CoffeeContext);
  const { messages, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Get unique origins for filters
  const origins = ["all", ...new Set(coffees.map((c) => c.origin))];

  // Filter coffees based on search and category
  const filteredCoffees = coffees.filter((coffee) => {
    const matchesSearch =
      coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coffee.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || coffee.origin === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddToCart = (coffee) => {
    addToCart(coffee);
  };

  const handleCoffeeDetails = (coffee) => {
    navigate("/details", { state: { coffee } });
  };

  if (loading) {
    return (
      <div className="client-homepage">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading our finest coffee selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="client-homepage">
      {/* Messages */}
      {messages.map((msg) => (
        <div key={msg.id} className="info-message">
          <span>✅</span>
          {msg.text}
        </div>
      ))}

      {/* Hero Section */}
      <div className="client-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bean Brew Coffee</h1>
          <p className="hero-subtitle">
            Discover the perfect cup of coffee, crafted with passion and
            precision
          </p>

          {/* Search Bar */}
          <div className="hero-search">
            <input
              type="text"
              placeholder="Search your favorite coffee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="button">🔍 Search</button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {origins.map((origin) => (
          <button
            key={origin}
            className={`category-btn ${activeFilter === origin ? "active" : ""}`}
            onClick={() => setActiveFilter(origin)}
          >
            {origin === "all" ? "🌍 All Origins" : `🌍 ${origin}`}
          </button>
        ))}
      </div>

      {/* Coffee Grid */}
      {filteredCoffees.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">😕</span>
          <h3>No coffees found</h3>
          <p>Try adjusting your search or filter</p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="coffee-grid">
          {filteredCoffees.map((coffee) => (
            <div key={coffee.id} className="coffee-card">
              {/* Badge for special/highlighted coffees */}
              {coffee.price > 10 && (
                <div className="card-badge">✨ Premium</div>
              )}

              {/* Image Section */}
              <div className="coffee-image-wrapper">
                <img
                  src={
                    coffee.imageUrl ||
                    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
                  }
                  alt={coffee.name}
                  className="coffee-image"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop";
                  }}
                />
                <div className="image-overlay"></div>
                <span className="quick-view">Quick View 👁️</span>
              </div>

              {/* Content Section */}
              <div className="coffee-content">
                <div className="coffee-header">
                  <h3 className="coffee-name">{coffee.name}</h3>
                  <span className="coffee-origin">
                    <span>🌍</span> {coffee.origin}
                  </span>
                </div>

                <p className="coffee-description">
                  {coffee.description.length > 100
                    ? `${coffee.description.substring(0, 100)}...`
                    : coffee.description}
                </p>

                {/* Coffee Meta Info */}
                <div className="coffee-meta">
                  <div className="meta-item">
                    <span className="meta-icon">⚡</span>
                    <span>{coffee.caffeine}</span>
                  </div>
                  {coffee.ingredients?.length > 0 && (
                    <div className="meta-item">
                      <span className="meta-icon">🥤</span>
                      <span>{coffee.ingredients.length} ingredients</span>
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="coffee-price">
                  <span className="price-currency">$</span>
                  <span className="price-value">{coffee.price.toFixed(2)}</span>
                  <span className="price-period">/ cup</span>
                </div>

                {/* Action Buttons */}
                <div className="card-actions">
                  <button
                    className="btn btn-cart"
                    onClick={() => handleAddToCart(coffee)}
                  >
                    <span>🛒</span> Add to Cart
                  </button>
                  <button
                    className="btn btn-details"
                    onClick={() => handleCoffeeDetails(coffee)}
                  >
                    <span>📋</span> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Stats */}
      <div className="coffee-stats">
        <p>
          Showing <strong>{filteredCoffees.length}</strong> of{" "}
          <strong>{coffees.length}</strong> coffees
          {activeFilter !== "all" && ` from ${activeFilter}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
    </div>
  );
};

export default CoffeeMenu;
