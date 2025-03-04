"use client";

import { useAddCategory } from "@/hooks/useAddCategory";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddCategory() {
  const { getCategories, addCategory, updateCategory, deleteCategory } =
    useAddCategory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Inputs
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await getCategories();

    if (error) {
      toast.error("Failed to fetch categories.");
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  // Handle Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await addCategory(name, null);
    if (error) {
      toast.error("Error adding category.");
    } else {
      toast.success("Category added successfully!");
      setName("");
      await fetchCategories();
    }

    setLoading(false);
    setCategoryModalOpen(false);
  };

  // Handle Add Sub-Category
  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await addCategory(name, parentId);
    if (error) {
      toast.error("Error adding sub-category.");
    } else {
      toast.success("Sub-category added successfully!");
      setName("");
      setParentId(null);
      await fetchCategories();
    }

    setLoading(false);
    setSubCategoryModalOpen(false);
  };

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const { error } = await deleteCategory(categoryId);
    if (error) {
      toast.error("Error deleting category.");
    } else {
      toast.success("Category deleted successfully!");
      await fetchCategories();
    }
  };

  // Handle Edit Category
  const handleEditCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateCategory(
      selectedCategory.id,
      editCategoryName,
    );
    if (error) {
      toast.error("Error updating category.");
    } else {
      toast.success("Category updated successfully!");
      await fetchCategories();
    }

    setLoading(false);
    setEditModalOpen(false);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Top Bar with Add Category Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => setCategoryModalOpen(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          + Add Category
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.length === 0 && (
            <p className="text-gray-600 text-center">No categories found.</p>
          )}
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md w-full"
            >
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setParentId(cat.id); // Set parent_id for sub-category
                    setSubCategoryModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Sub-Category
                </button>
                <Link href={`/admin/sub-category/${cat.id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                  View Sub-Categories
                </Link>
                <button
                  onClick={() => {
                    setSelectedCategory(cat); // Set the category to edit
                    setEditCategoryName(cat.name); // Set the category name in input
                    setEditModalOpen(true); // ✅ Ensure modal state is set to true
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Add Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Save Category
              </button>
            </form>
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">Edit Category</h3>
            <form onSubmit={handleEditCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Enter new category name"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-md"
              >
                Update Category
              </button>
            </form>
            <button
              onClick={() => setEditModalOpen(false)}
              className="mt-2 w-full bg-gray-400 text-white py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Sub-Category Modal */}
      {isSubCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-fadeIn">
            <h3 className="text-xl font-bold mb-4">
              Add Sub-Category to "{selectedCategory?.name}"
            </h3>
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
                className="w-full bg-green-600 text-white py-2 rounded-md"
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
    </div>
  );
}
