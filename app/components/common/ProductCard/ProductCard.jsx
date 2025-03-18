"use client";
import React, { useState } from "react";

function ProductCard({ product }) {
  console.log(product, "==========->");
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="mb-6">
        <div className="border border-gray-200 rounded-md bg-white overflow-hidden">
          {/* Product Image */}
          <div
            className="relative border-b border-gray-200 p-3 overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <a href={product} className="block">
              <img
                className={`w-full border border-gray-200 rounded-md transition-opacity duration-300 ${
                  hovered ? "opacity-0" : "opacity-100"
                }`}
                // src={product.image}
                alt={product.name}
              />
              <img
                className={`absolute inset-0 w-full transition-opacity duration-300 ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
                // src={product.hoverImage}
                alt={product.name}
              />
            </a>

            {/* Sale Badge */}
            {product.sale && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                {product.sale}
              </span>
            )}

            {/* Action Buttons */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 flex space-x-2">
              <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200">
                <i className="ri-eye-line text-sm"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200">
                <i className="mdi mdi-vector-arrange-below text-sm"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200">
                <i className="ri-shopping-cart-line text-sm"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200">
                <i className="ri-heart-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <a href="#" className="text-sm text-gray-500">
                {product.category}
              </a>
              <div className="flex text-red-500 text-sm">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <i key={index} className="ri-star-line ml-1"></i>
                  ))}
              </div>
            </div>

            <h5 className="text-md font-semibold">
              <a
                href={product.link}
                className="hover:text-green-500 transition"
              >
                {product.name}
              </a>
            </h5>

            {/* Pricing */}
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            </div>

            {/* Colors */}
            {/* <div className="mt-3 flex space-x-2">
                {product?.colors?.map((color, index) => (
                    <span
                    key={index}
                    className="w-6 h-6 rounded-md border border-gray-300"
                    style={{ backgroundColor: color }}
                    ></span>
                ))}
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
