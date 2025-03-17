"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "../components/common/Footer/Footer";
import PageHeader from "../components/common/PageHeader/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "../components/common/Navbar/Navbar";
import { supabaseClient } from "@/utlis/SupabaseClient";
import { AiFillEye } from "react-icons/ai";
import Example from "../components/common/Testing/Test";
import Link from "next/link";

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
  useEffect(() => {
    if (!subId) return;

    fetchCategories();
  }, [subId]);
  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

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
          const maxPrice = Math.max(...data.map((p) => Math.round(p.price)), 0);
          setPriceRange([0, maxPrice + 1000]);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.product_title
      .toLowerCase()
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
  function SidebarFilter() {
    return (
      <div className="sticky top-20 mt-[20px]">
        <div className="overflow-y-auto p-6 bg-white shadow-lg rounded-lg z-10">
          <div className="mb-8 flex items-center justify-between ">
            <h2 className="text-2xl font-bold">Filter</h2>
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

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Product Search</h3>
            <input
              type="text"
              placeholder="Search Product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Price Range</h3>

            {/* Min & Max Price Inputs */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none"
                min="0"
              />
              <span className="text-lg">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(products.flatMap((p) => p.color))).map(
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
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(products?.flatMap((p) => p.size || []))) // Ensure products is defined and color exists
                .filter(Boolean) // Remove undefined or null values
                .map((size, index) => (
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
      </div>
    );
  }
  const ProductListing = () => {
    return (
      <div className="w-full height-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product, index) => (
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
      <div className="flex ">
        <div className="w-1/4 p-4 ">
          <SidebarFilter />
        </div>
        <ProductListing />
      </div>
      {selectedProduct && (
        <Example
          isOpen={!!selectedProduct}
          data={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </>uu
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
