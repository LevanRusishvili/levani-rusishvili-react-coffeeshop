import { createContext, useState, useCallback, useContext } from "react";

export const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([
    {
      id: "Ing_scmppl1",
      name: "Arabica Beans",
      price: 15.99,
      description: "High-quality Arabica beans with a smooth flavor.",
      strength: "Medium",
      flavor: "Fruity",
    },
    {
      id: "Ing_scmppl2",
      name: "Robusta Beans",
      price: 12.99,
      description: "Strong Robusta beans with a bold taste.",
      strength: "High",
      flavor: "Earthy",
    },
    {
      id: "Ing_scmppl3",
      name: "Vanilla Syrup",
      price: 8.99,
      description: "Sweet vanilla syrup to enhance your coffee.",
      strength: "Low",
      flavor: "Sweet",
    },
  ]);
const [coffees, setCoffees] = useState([
  {
    id: "cod_ethiopia",
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    caffeine: "100mg",
    price: 4.99,
    imageUrl:
      "https://images.unsplash.com/photo-1559056199-5a47f60c5053?w=400&h=300&fit=crop",
    description:
      "Light roasted with bright acidity, complex fruit and floral notes. A true classic.",
    ingredients: ["Ing_scmppl1"],
  },
  {
    id: "cod_colombia",
    name: "Colombian Supremo",
    origin: "Colombia",
    caffeine: "140mg",
    price: 5.49,
    imageUrl:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=300&fit=crop",
    description:
      "Medium roast with sweet caramel flavor, balanced acidity, and a clean finish.",
    ingredients: ["Ing_scmppl2"],
  },
  {
    id: "cod_guatemala",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    caffeine: "120mg",
    price: 5.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
    description:
      "Full-bodied with spicy chocolate notes and a hint of smoky sweetness.",
    ingredients: ["Ing_scmppl1", "Ing_scmppl2"],
  },
  {
    id: "cod_kenya",
    name: "Kenya AA",
    origin: "Kenya",
    caffeine: "130mg",
    price: 6.99,
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    description:
      "Bright and complex with notes of berry, citrus, and a winey finish.",
    ingredients: ["Ing_scmppl1"],
  },
  {
    id: "cod_sumatra",
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    caffeine: "110mg",
    price: 5.75,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    description:
      "Low acidity, full body with earthy, herbal, and spicy undertones.",
    ingredients: ["Ing_scmppl2"],
  },
  {
    id: "cod_costa_rica",
    name: "Costa Rica Tarrazu",
    origin: "Costa Rica",
    caffeine: "125mg",
    price: 5.5,
    imageUrl:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&h=300&fit=crop",
    description:
      "Bright, clean flavor with hints of chocolate and nuts. Perfect for any time.",
    ingredients: ["Ing_scmppl1", "Ing_scmppl3"],
  },
  {
    id: "cod_brazil",
    name: "Brazil Santos",
    origin: "Brazil",
    caffeine: "135mg",
    price: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop",
    description:
      "Smooth, low-acidity with a nutty, sweet flavor profile. A daily favorite.",
    ingredients: ["Ing_scmppl2"],
  },
  {
    id: "cod_panama",
    name: "Panama Geisha",
    origin: "Panama",
    caffeine: "115mg",
    price: 12.0,
    imageUrl:
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=300&fit=crop",
    description:
      "Rare and exquisite with extraordinary floral, jasmine, and tropical fruit notes.",
    ingredients: ["Ing_scmppl1"],
  },
  {
    id: "cod_hawaii",
    name: "Hawaiian Kona",
    origin: "Hawaii",
    caffeine: "120mg",
    price: 15.0,
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
    description:
      "World-famous with a rich, complex, and pleasantly mild flavor. Liquid gold.",
    ingredients: ["Ing_scmppl3"],
  },
  {
    id: "cod_french",
    name: "French Roast",
    origin: "Blend",
    caffeine: "145mg",
    price: 4.75,
    imageUrl:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400&h=300&fit=crop",
    description:
      "Dark roasted, smoky, and bold with a charred, caramelized sweetness.",
    ingredients: ["Ing_scmppl2", "Ing_scmppl3"],
  },
]);


   const handleEditIngredient = useCallback((id, updatedIngredient) => {
    setIngredients((prev) =>
      prev.map((ingredient) => {
        return ingredient.id === id
          ? { ...ingredient, ...updatedIngredient }
          : ingredient; 
      })
    );
  }, []);

  const addIngredient = useCallback((ingredient) => {
    setIngredients((prev) => [
      ...prev,
      {
        ...ingredient,
        id: `Ing_${Math.random().toString(36).substr(2, 8)}`,
      },
    ]);
  }, []);

  const addCoffee = useCallback((coffee) => {
    setCoffees((prev) => [
      ...prev,
      {
        ...coffee,
        id: `cod_${Math.random().toString(36).substr(2, 8)}`,
      },
    ]);
  }, []);

  const updateCoffee = useCallback((id, updatedCoffee) => {
    setCoffees((prev) =>
      prev.map((coffee) =>
        coffee.id === id ? { ...coffee, ...updatedCoffee } : coffee
      )
    );
  }, []);

  const deleteCoffee = useCallback((id) => {
    setCoffees((prev) => prev.filter((coffee) => coffee.id !== id));
  }, []);

  const deleteIngredient = useCallback((id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
  }, []);

  const computeTotalPrice = useCallback(
    (basePrice, selectedIngredients) => {
      const ingredientsTotal = selectedIngredients.reduce(
        (total, ingredientId) => {
          const ingredient = ingredients.find((ing) => ing.id === ingredientId);
          return total + (ingredient?.price || 0);
        },
        0
      );
      return (basePrice + ingredientsTotal).toFixed(2);
    },
    [ingredients]
  );

  return (
    <CoffeeContext.Provider
      value={{
        ingredients,
        coffees,
        addIngredient,
        addCoffee,
        updateCoffee,
        deleteCoffee,
        deleteIngredient,
        computeTotalPrice,
        handleEditIngredient,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffeeContext = () => useContext(CoffeeContext);
