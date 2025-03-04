"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAddProduct } from "@/hooks/useProduct"; // Import product hook
import toast, { Toaster } from "react-hot-toast";
import { supabaseClient } from "@/utlis/SupabaseClient";

function ProductPage() {
  const { subId } = useParams(); // Get sub-category ID from URL
  const { getProductsBySubCategory, deleteProductById, addProduct } =
    useAddProduct();
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isEditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subId) return;
    fetchProducts(subId);
  }, [subId]);

  const fetchProducts = async (subCategoryId) => {
    const { data, error } = await getProductsBySubCategory(subCategoryId);
    if (error) {
      toast.error("Failed to fetch products.");
    } else {
      setProducts(data || []);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await deleteProductById(productId);
    if (error) {
      toast.error("Error deleting product.");
    } else {
      toast.success("Product deleted successfully!");
      fetchProducts(subId); // Refresh product list
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productTitle || !subId) {
      toast.error("Please enter all required fields.");
      setLoading(false);
      return;
    }

    let imageUrl = "";

    // Upload image to Supabase Storage
    if (productImage) {
      const fileName = `${Date.now()}-${productImage.name}`;

      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from("assets") // Ensure the correct bucket name
          .upload(`images/${fileName}`, productImage, {
            cacheControl: "3600",
            upsert: false,
          });

      if (uploadError) {
        toast.error("Failed to upload image.");
        console.error("Image Upload Error:", uploadError);
        setLoading(false);
        return;
      }

      // Construct image URL (Ensure correct path)
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/images/${fileName}`;
    }

    // Prepare product data
    const newProduct = {
      product_title: productTitle,
      product_description: productDescription,
      image_url: imageUrl,
      color: productColor ? productColor.split(",").map((c) => c.trim()) : [],
      size: productSize ? productSize.split(",").map((s) => s.trim()) : [],
      price: productPrice ? parseFloat(productPrice) : 0,
      sub_cate_id: subId,
    };
    const { data, error } = await addProduct(newProduct);

    fetchProducts(subId); // Refresh product list
    if (error) {
      toast.error("Error adding product.");
      console.error("Supabase Insert Error:", error);
    } else {
      toast.success("Product added successfully!");
      console.log("Product Saved:", data);
      setProductTitle("");
      setProductDescription("");
      setProductImage(null);
      setProductColor("");
      setProductSize("");
      setProductPrice("");
      setAddProductModalOpen(false);
    }
    setLoading(false);
  };
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productTitle || !subId) {
      toast.error("Please enter all required fields.");
      setLoading(false);
      return;
    }
    let imageUrl = selectedProduct.image_url;
    if (productImage) {
      const fileName = `${Date.now()}-${productImage.name}`;

      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from("assets") // Ensure the correct bucket name
          .upload(`images/${fileName}`, productImage, {
            cacheControl: "3600",
            upsert: false,
          });

      if (uploadError) {
        toast.error("Failed to upload new image.");
        console.error("Image Upload Error:", uploadError);
        setLoading(false);
        return;
      }
      // Construct new image URL
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/images/${fileName}`;
    }
    // Prepare updated product data
    const updatedProduct = {
      product_title: selectedProduct.product_title,
      product_description: productDescription,
      image_url: imageUrl,
      color: productColor,
      size: productSize,
      price: productPrice ? parseFloat(productPrice) : 0,
    };
    // Update product in Supabase
    const { data, error } = await supabaseClient
      .from("products")
      .update(updatedProduct)
      .eq("id", selectedProduct.id);
    if (error) {
      toast.error("Error updating product.");
      console.error("Supabase Update Error:", error);
    } else {
      toast.success("Product updated successfully!");
      console.log("Updated Product:", data);
      // Refresh product list
      fetchProducts(subId);
      // Close modal
      setEditProductModalOpen(false);
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />

      {/* Page Header with Add Button */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h1 className="text-3xl font-bold text-gray-800 w-full sm:w-auto">
          Products
        </h1>
        <button
          onClick={() => setAddProductModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition mt-4 sm:mt-0"
        >
          + Add Product
        </button>
      </div>
      {console.log(products, "hellowssss")}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, index) => {
          console.log(product?.color, "color");
          // const colors = JSON.parse(JSON.parse(product.color));
          // const sizes = JSON.parse(product.size);
          // console.log(colors[0], product?.product_title);
          return (
            <>
              <div
                key={product.id}
                className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                {/* Product Image */}
                <img
                  src={product.image_url} // Fallback image
                  alt={product.title}
                  className="w-full h-52 object-cover"
                />

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.product_title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {product.product_description}
                  </p>

                  <div className="color-container">
                    {product?.color?.map((color, index) => (
                      <span
                        key={index}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                      ></span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 flex-wrap">
                    <span className="text-xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {/* Edit Button */}
                      <button
                        onClick={() => {
                          setEditProductModalOpen(true);
                          setSelectedProduct(product);
                          setProductTitle(product.product_title || ""); // Set the product title
                          setProductDescription(
                            product.product_description || ""
                          ); // Set the description
                          setProductColor(product.color || "");
                          setProductSize(product.size || "");
                          setProductPrice(
                            product.price ? product.price.toString() : ""
                          );
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tag or Label */}
                {/* <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
                  {JSON.parse(product.size)}
                </div> */}
              </div>
            </>
          );
        })}
      </div>

      {/* Add Product Modal (Responsive) */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-11/12 sm:w-96">
            <h3 className="text-xl font-bold mb-4">Add Product</h3>
            <p className="text-gray-600">
              Modal content for adding a product...
            </p>
            <button
              onClick={() => setAddProductModalOpen(false)}
              className="mt-4 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal (Responsive) */}
      {isEditProductModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-screen-lg animate-slideIn">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Edit Product
            </h3>

            <form
              onSubmit={handleEditProduct}
              className="grid grid-cols-2 gap-4"
            >
              {/* Product Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full p-3 border rounded-md h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Existing Image Preview */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Current Image
                </label>
                <img
                  src={selectedProduct.image_url}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>

              {/* Image Upload (Optional) */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Replace Image (optional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  className="w-full border p-2 rounded-md"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Color
                </label>
                <input
                  type="text"
                  placeholder="Color (e.g., red, black)"
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Size
                </label>
                <input
                  type="text"
                  placeholder="Size"
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Price (INR)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Sub-Category ID (Read-only) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Sub-Category
                </label>
                <input
                  type="text"
                  value={subId}
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setEditProductModalOpen(false)}
                  className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product */}

      {isAddProductModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-screen-lg animate-slideIn">
            <h3 className="text-2xl font-bold mb-4 text-center">Add Product</h3>

            <form
              onSubmit={handleAddProduct}
              className="grid grid-cols-2 gap-4"
            >
              {/* Product Title */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full p-3 border rounded-md h-24 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  className="w-full border p-2 rounded-md"
                  required
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Color
                </label>
                <input
                  type="text"
                  placeholder="Color (e.g., red, black)"
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Size
                </label>
                <input
                  type="text"
                  placeholder="Size"
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Price (INR)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Sub-Category ID (Read-only) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Sub-Category
                </label>
                <input
                  type="text"
                  value={subId} // Display the subcategory ID (this can be used to bind to the product)
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setAddProductModalOpen(false)}
                  className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
