"use client";

import { useSubCategory } from "@/hooks/useSubCategory";
import { useAddProduct } from "@/hooks/useProduct";
import { useState, useEffect } from "react";
import { useParams ,useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { supabaseClient } from "@/utlis/SupabaseClient";
import Link from "next/link";

export default function SubCategoryPage() {
  const {
    getSubCategories,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  } = useSubCategory();
  const { id } = useParams(); // Get id from URL
  console.log(id);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Modals
  const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  // Inputs
  const [name, setName] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const { addProduct } = useAddProduct();
  // Fetch subcategories when the component mounts
  useEffect(() => {
    fetchSubCategories();
  }, [id]);

  const fetchSubCategories = async () => {
    setLoading(true);
    const { data, error } = await getSubCategories(id);

    if (error) {
      toast.error("Failed to fetch subcategories.");
    } else {
      setSubCategories(data || []);
    }
    setLoading(false);
  };

  // Handle Add Sub-Category
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await addSubCategory(name, id);
    if (error) {
      toast.error("Error adding sub-category.");
    } else {
      toast.success("Sub-category added successfully!");
      setName("");
      await fetchSubCategories();
    }

    setLoading(false);
    setSubCategoryModalOpen(false);
  };

  // Handle Edit Sub-Category
  const handleEditSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateSubCategory(
      selectedSubCategory.id,
      editSubCategoryName,
    );
    if (error) {
      toast.error("Error updating sub-category.");
    } else {
      toast.success("Sub-category updated successfully!");
      await fetchSubCategories();
    }

    setLoading(false);
    setEditModalOpen(false);
  };

  // Handle Delete Sub-Category
  const handleDeleteSubCategory = async (subCategoryId) => {
    if (!confirm("Are you sure you want to delete this sub-category?")) return;

    const { error } = await deleteSubCategory(subCategoryId);
    if (error) {
      toast.error("Error deleting sub-category.");
    } else {
      toast.success("Sub-category deleted successfully!");
      await fetchSubCategories();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productTitle || !selectedSubCategoryId) {
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
  // Convert colors to an array and then stringify it to store as a string
  color: productColor ? JSON.stringify(productColor.split(',')) : "[]",  // Split the color input by comma and stringify it
  size: productSize ? JSON.stringify([productSize]) : "[]", // Convert to JSON array
  price: productPrice ? parseFloat(productPrice) : 0,
  sub_cate_id: selectedSubCategoryId,
};
    // Insert product into Supabase
    const { data, error } = await addProduct(newProduct);

    if (error) {
      toast.error("Error adding product.");
      console.error("Supabase Insert Error:", error);
    } else {
      toast.success("Product added successfully!");
      console.log("Product Saved:", data);

      // Reset form after success
      setProductTitle("");
      setProductDescription("");
      setProductImage(null);
      setProductColor("");
      setProductSize("");
      setProductPrice("");
      setProductModalOpen(false);
    }

    setLoading(false);
  };

  const handleViewProducts = (subCategoryId) => {
    // Redirect to the products page with the sub-category ID as a query parameter
    console.log("Viewing Products for Sub-Category ID:", subCategoryId);
    router.push(`/admin/product/${subCategoryId}`);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Bar with Add Sub-Category Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sub-Categories</h2>
        <button
          onClick={() => setSubCategoryModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          + Add Sub-Category
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {subCategories.map((sub) => (
            <div
              key={sub.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md w-full"
            >
              <h3 className="text-lg font-semibold">{sub.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedSubCategory(sub);
                    setEditSubCategoryName(sub.name);
                    setEditModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setSelectedSubCategory(sub);
                    setSelectedSubCategoryId(sub.id);
                    setProductModalOpen(true);
                  }}
                >
                  Add Product
                </button>

                <button
                  onClick={()=>handleViewProducts(sub.id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  View Product
                </button>
                <button
                  onClick={() => handleDeleteSubCategory(sub.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Sub-Category Modal */}
      {isSubCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Add Sub-Category</h3>
            <form onSubmit={handleAddSubCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Enter sub-category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Save Sub-Category
              </button>
            </form>
            <button
              onClick={() => setSubCategoryModalOpen(false)}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedSubCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Edit Sub-Category</h3>
            <form onSubmit={handleEditSubCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Edit sub-category name"
                value={editSubCategoryName}
                onChange={(e) => setEditSubCategoryName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Update Sub-Category
              </button>
            </form>
            <button
              onClick={() => {
                setEditModalOpen(false);
                setSelectedSubCategory(null);
              }}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isProductModalOpen && selectedSubCategory && (
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
                  placeholder="Color"
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
                  value={selectedSubCategory.name}
                  readOnly
                  className="w-full p-3 border rounded-md bg-gray-100"
                />
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setProductModalOpen(false);
                    setSelectedSubCategory(null);
                  }}
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
