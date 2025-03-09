"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "../components/common/Footer/Footer";
import PageHeader from "../components/common/PageHeader/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "../components/common/Navbar/Navbar";
import { supabaseClient } from "@/utlis/SupabaseClient";
import { AiFillEye } from "react-icons/ai";
import Example from "../components/common/Testing/Test";

function PageContent() {
  const params = useParams();
  const { product } = params;
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 346 },
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    if (!subId) return;

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("product")
          .select("*")
          .eq("sub_cate_id", subId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Failed to fetch categories", error);
        } else {
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products with all products
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchCategories();
  }, [subId]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const withinPriceRange =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      const matchesColor =
        filters.colors.length === 0 ||
        filters.colors.some((color) => product.color?.includes(color));

      const matchesSize =
        filters.sizes.length === 0 ||
        filters.sizes.some((size) => product.size?.includes(size));

      return withinPriceRange && matchesColor && matchesSize;
    });

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  function SidebarFilter({ onFilterChange }) {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 346 });
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handlePriceChange = (e) => {
      const { name, value } = e.target;
      const newValue = parseInt(value, 10);

      const newPriceRange = {
        min:
          name === "min"
            ? Math.min(newValue, priceRange.max - 1)
            : priceRange.min,
        max:
          name === "max"
            ? Math.max(newValue, priceRange.min + 1)
            : priceRange.max,
      };

      setPriceRange(newPriceRange);
      onFilterChange({
        priceRange: newPriceRange,
        colors: selectedColors,
        sizes: selectedSizes,
      });
    };

    const handleColorChange = (color) => {
      const newSelectedColors = selectedColors.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...selectedColors, color];

      setSelectedColors(newSelectedColors);
      onFilterChange({
        priceRange,
        colors: newSelectedColors,
        sizes: selectedSizes,
      });
    };

    const handleSizeChange = (size) => {
      const newSelectedSizes = selectedSizes.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...selectedSizes, size];

      setSelectedSizes(newSelectedSizes);
      onFilterChange({
        priceRange,
        colors: selectedColors,
        sizes: newSelectedSizes,
      });
    };

    return (
      <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto p-6 bg-white shadow-lg rounded-lg z-10">
        {/* Filter Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Filter</h2>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Product Search.</h3>
          <input
            type="text"
            placeholder="Search Product"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Price</h3>
          <div className="flex justify-between text-sm">
            <span>₹{priceRange.min}</span>
            <span>₹{priceRange.max}</span>
          </div>
          <div className="relative w-full mt-2">
            <input
              type="range"
              name="min"
              min="0"
              max="346"
              value={priceRange.min}
              onChange={handlePriceChange}
              className="absolute w-full cursor-pointer z-10"
            />
            <input
              type="range"
              name="max"
              min="0"
              max="346"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="absolute w-full cursor-pointer z-20"
            />
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Color</h3>
          <div className="flex flex-wrap gap-2">
            {["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#8E44AD"].map(
              (color, index) => (
                <button
                  key={index}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform ${
                    selectedColors.includes(color) ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleColorChange(color)}
                />
              )
            )}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <button
                key={index}
                className={`px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200 transition ${
                  selectedSizes.includes(size) ? "bg-gray-200" : ""
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const ProductListing = () => {
    return (
      <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, index) => (
          <div
            key={index}
            className="group flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <a
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="w-full h-full object-cover rounded-3xl duration-500 group-hover:-translate-y-5"
                src={product.image_url}
                alt={product.product_title}
              />
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.product_title}
                </h5>
              </a>
              <div className="flex items-center mb-3">
                <span className="text-lg font-medium text-slate-900 mr-2">
                  Color:
                </span>
                <div className="flex space-x-2 mt-1">
                  {product.color?.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full"
                      style={{
                        backgroundColor: color,
                        cursor: "pointer",
                        border: "2px solid #fff",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center mb-3">
                <span className="text-sm font-medium text-slate-900 mr-2">
                  Size:
                </span>
                <div className="flex space-x-2">
                  {product.size?.map((size, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium text-slate-900 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-200"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-lg font-bold text-slate-900">
                    MRP ₹ {product.price || "449"}
                  </span>
                </p>
              </div>
              <a
                onClick={() => handleQuickView(product)}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
              >
                Quick View
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <PageHeader
        title={product?.[1] || "Category"}
        backgroundImage={"/assets/slider4.jpg"}
        breadcrumbs={product}
      />

      <div className="flex">
        {/* Sidebar Filter */}
        <div className="w-1/4 p-4">
          <SidebarFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Product Listing */}
        <ProductListing
          products={filteredProducts}
          handleQuickView={handleQuickView}
        />
      </div>

      {selectedProduct && (
        <Example
          isOpen={!!selectedProduct}
          data={selectedProduct} // Pass the selected product to the modal
          onClose={() => setSelectedProduct(null)} // Close the modal
        />
      )}

      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
