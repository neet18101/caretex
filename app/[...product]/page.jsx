"use client";
import React, { Suspense, useEffect, useState } from "react";
import Footer from "../components/common/Footer/Footer";
import PageHeader from "../components/common/PageHeader/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "../components/common/Navbar/Navbar";
import { supabaseClient } from "@/utlis/SupabaseClient";
import { AiFillEye } from "react-icons/ai";

function PageContent() {
  const params = useParams();
  const { product } = params;
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId"); // ✅ Get subId from URL params
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 40, max: 346 });

  useEffect(() => {
    if (!subId) return; // ✅ Prevent running effect if subId is null

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
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };

    fetchCategories();
  }, [subId]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  function SidebarFilter() {
    return (
      <div className="sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto p-6 bg-white shadow-lg rounded-lg z-10">
        {/* Filter Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Filter</h2>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Category</h3>
          <input
            type="text"
            placeholder="Search Product"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Price</h3>
          <div className="space-y-4">
            <div className="relative w-full">
              <input
                type="range"
                name="min"
                min="40"
                max="346"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="absolute w-full h-1.5 bg-gray-200 rounded-full appearance-none"
              />
              <input
                type="range"
                name="max"
                min="40"
                max="346"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="absolute w-full h-1.5 bg-blue-600 rounded-full appearance-none"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>Min Price: ${priceRange.min}</span>
              <span>Max Price: ${priceRange.max}</span>
            </div>
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Color</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              "ClassicCopri",
              "DopperCoot",
              "Comfy Leading*",
              "DenimDream",
              "ShidBits Dress",
              "ShidBits Dress",
              "GlomPants",
            ].map((color, index) => (
              <div
                key={index}
                className="p-2 border border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-100"
              >
                {color}
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["4", "6", "8", "10", "12", "14", "16", "18", "20"].map(
              (size, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {size}
                </div>
              )
            )}
          </div>
        </div>

        {/* Category List */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Category</h3>
          <ul className="space-y-2">
            {[
              { name: "Dresses", count: 10 },
              { name: "Top & Blouses", count: 5 },
              { name: "Boots", count: 17 },
            ].map((category, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{category.name}</span>
                <span>({category.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const ProductListing = () => {
    return (
      <div className="container mx-auto px-4 lg:px-20 py-10">
        {products.length === 0 ? (
          // If products array is empty, show "No data found" message
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold">No Data Found</h2>
            <p className="text-gray-500">
              Sorry, we couldn't find any products matching your criteria.
            </p>
          </div>
        ) : (
          <ul
            id="masonry2"
            className="row relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {products.map((product) => (
              <li
                className="relative group w-full h-[400px] flex flex-col justify-between"
                key={product.id}
              >
                <div className="relative overflow-hidden rounded-3xl duration-500 h-full border-2 border-[#6b2a2e]">
                  <img
                    src={product.image_url}
                    alt={product.name || "Product Image"}
                    className="w-full h-full object-cover rounded-3xl duration-500 group-hover:-translate-y-5"
                  />
                  <div className="absolute bottom-0 left-0 w-full flex flex-col items-end gap-2 p-4 sm:px-2 duration-200">
                    <a
                      href="javascript:void(0);"
                      className="btn absolute left-1/2 -translate-x-1/2 -bottom-16 group-hover:bottom-[0px] bg-secondary text-white rounded-full py-3 px-6 text-sm font-medium leading-[1.2] border-4 border-[#fffaf3] bg-[#000] hover:bg-primary duration-500 w-[150px]"
                    >
                      <i className="fa-solid fa-eye md:hidden block"></i>
                      <span className="hidden md:block">Quick View</span>
                    </a>
                  </div>
                </div>
                <div className="py-5 flex justify-between items-center">
                  <h5 className="text-lg font-semibold capitalize">
                    {/* <a href="shop-list.html">{product.name || "Product Name"}</a> */}
                  </h5>
                  <h5 className="text-lg font-semibold">
                    {/* ${product.price || "0.00"} */}
                  </h5>
                </div>
              </li>
            ))}
          </ul>
        )}
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
          <SidebarFilter />
        </div>

        {/* Product Listing */}
        <div className="w-3/4 p-4">
          <ProductListing />
        </div>
      </div>

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
