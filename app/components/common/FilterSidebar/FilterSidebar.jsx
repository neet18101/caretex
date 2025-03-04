import { useState } from "react";

const FilterSidebar = ({ onFilterChange }) => {
  // State for filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(200);
  const [selectedColors, setSelectedColors] = useState([]);

  // Category Options
  const categories = [
    { id: "drinks", name: "Juice & Drinks", count: 20 },
    { id: "dairy", name: "Dairy & Milk", count: 54 },
    { id: "snack", name: "Snack & Spice", count: 64 },
  ];

  // Color Options
  const colors = [
    { id: "blue", name: "Blue", colorCode: "#6c9eff" },
    { id: "yellow", name: "Yellow", colorCode: "#dede44" },
    { id: "red", name: "Red", colorCode: "#fb5555" },
    { id: "green", name: "Green", colorCode: "#64b496" },
  ];

  // Handle category selection
  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  // Handle color selection
  const handleColorChange = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((color) => color !== id) : [...prev, id]
    );
  };

  // Handle filter apply
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      colors: selectedColors,
    });
  };

  return (
    <div
      className="p-6 bg-gray-100 border border-gray-200 rounded-md sticky top-36"
      style={{ background: "#f59f8b24", border: "1px solid #6b2a2e" }}
    >
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg border-b pb-2">Category</h4>
        <div className="pt-6">
          {categories.map((category) => (
            <div className="flex items-center mb-3" key={category.id}>
              <input
                type="checkbox"
                id={category.id}
                className="hidden"
                onChange={() => handleCategoryChange(category.id)}
                checked={selectedCategories.includes(category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-sm text-gray-600 cursor-pointer flex-grow"
              >
                {category.name}
              </label>
              <span className="text-xs text-gray-600">[{category.count}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg border-b pb-2">Price</h4>
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max="200"
            className="w-full"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
          <p className="mt-4 text-sm font-bold">Price: ₹0 - ₹{priceRange}</p>
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-lg border-b pb-2">Colors</h4>
        <div className="pt-6">
          {colors.map((color) => (
            <div className="flex items-center mb-3" key={color.id}>
              <input
                type="checkbox"
                id={color.id}
                className="hidden"
                onChange={() => handleColorChange(color.id)}
                checked={selectedColors.includes(color.id)}
              />
              <label
                htmlFor={color.id}
                className="text-sm text-gray-600 cursor-pointer flex-grow"
              >
                {color.name}
              </label>
              <span
                className="w-5 h-5 rounded-md border border-gray-400"
                style={{ backgroundColor: color.colorCode }}
              ></span>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
