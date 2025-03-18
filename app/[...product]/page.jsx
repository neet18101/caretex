"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "../components/common/Footer/Footer";
import PageHeader from "../components/common/PageHeader/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "../components/common/Navbar/Navbar";
import { supabaseClient } from "@/utlis/SupabaseClient";
import Example from "../components/common/Testing/Test";
import Link from "next/link";
import { FiFilter } from "react-icons/fi"; // Icon for filter button
import { AiOutlineClose } from "react-icons/ai"; // Close icon

function PageContent() {
  const params = useParams();
  const product = params?.product || [];
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar

  useEffect(() => {
    if (!subId) return;
    fetchCategories();
  }, [subId]);

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
        if (data.length > 0) {
          const maxPriceValue = Math.max(
            ...data.map((p) => Math.round(p.price)),
            0
          );
          setMaxPrice(maxPriceValue);
          setPriceRange([0, maxPriceValue]);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.product_title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesColor =
      selectedColors.length === 0 ||
      (product.color && selectedColors.some((c) => product.color.includes(c)));

    const matchesSize =
      selectedSizes.length === 0 ||
      (product.size && selectedSizes.some((s) => product.size.includes(s)));

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesTitle && matchesColor && matchesSize && matchesPrice;
  });

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const ProductListing = () => {
    return (
      <div className="w-full height-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div key={index} className="shadow-lg h-[500px]">
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href={
                (product.product_title || "").replace(" ", "-").toLowerCase() ||
                "/"
              }
            >
              <img
                className="w-full h-full object-cover rounded-3xl duration-500 group-hover:-translate-y-5"
                src={product.image_url || "/default-image.jpg"}
                alt={product.product_title || "Product Image"}
              />
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.product_title}
                </h5>
              </Link>
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
              <Link
                href="#"
                onClick={() => handleQuickView(product)}
                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer"
              >
                Quick View
              </Link>
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

      {/* Mobile Filter Button */}
      <button
        id="filter-sidebar"
        className="md:hidden flex items-center gap-2 bg-[#000] text-white px-4 py-2 rounded-md fixed top-[100] left-4 z-40"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiFilter className="text-lg" /> Filters
      </button>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-[#fff]">
        {/* Sidebar (Responsive) */}
        <div
          className={`fixed inset-0 bg-[#000000b3] md:bg-transparent bg-opacity-50 z-40 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-1/4 p-4 shadow-md rounded-lg transition-transform`}

          // className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform ${
          //   isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          // } md:relative md:translate-x-0 md:w-1/4 p-4 bg-[#000000b3] shadow-md rounded-lg transition-transform`}
        >
          <SidebarFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            products={products}
            fetchCategories={fetchCategories}
            maxPrice={maxPrice}
          />

          {/* Close Button for Mobile */}
          <button
            className="absolute top-4 right-4 md:hidden text-xl text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4">
          <ProductListing
            filteredProducts={filteredProducts}
            handleQuickView={handleQuickView}
          />
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <Example
          isOpen={!!selectedProduct}
          data={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </>
  );
}

function SidebarFilter({
  searchTerm,
  setSearchTerm,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  priceRange,
  setPriceRange,
  products,
  fetchCategories,
  maxPrice,
}) {
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }; 

  return (
    <div className="sticky top-20 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Header with Reset Button */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedColors([]);
              setSelectedSizes([]);
              fetchCategories();
            }}
            className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Search */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Search Product</h3>
          <input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Price Range Slider */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </h3>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full"
          />
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(products.flatMap((p) => p.color || []))).map(
              (color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: color.trim(),
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: selectedColors.includes(color)
                      ? "3px solid black"
                      : "2px solid white",
                    cursor: "pointer",
                    transition: "0.3s ease-in-out",
                  }}
                  onClick={() => handleColorChange(color.trim())}
                  className="shadow-md hover:scale-110"
                />
              )
            )}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(products?.flatMap((p) => p.size || []))) // Ensure products exist
              .filter(Boolean) // Remove undefined or null values
              .map((size, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded-md hover:bg-gray-200 transition ${
                    selectedSizes.includes(size)
                      ? "bg-gray-200"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
