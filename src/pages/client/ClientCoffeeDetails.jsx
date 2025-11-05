import { useLocation, useNavigate } from "react-router-dom";

const ClientCoffeeDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const coffee = location.state?.coffee;

    if (!coffee) {
        return (
            <div>
                <h2>coffee not found</h2>
                <button onClick={() => navigate('/')}>Go Back to Menu</button>
            </div>
        )
    }
  return (
    <div>
      <h1>{coffee.name} Details</h1>
      <p>{coffee.description}</p>
      <button onClick={() => navigate("/")}>Back to Menu</button>
    </div>
  );
};

export default ClientCoffeeDetails;
