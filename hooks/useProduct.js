import { supabaseClient } from "@/utlis/SupabaseClient";

export function useAddProduct() {
  const addProduct = async (productData) => {
    console.log("Adding Product Data:", productData); // Debugging

    const { data, error } = await supabaseClient
      .from("product") // Ensure correct table name
      .insert([
        {
          ...productData,
          color: Array.isArray(productData.color) ? productData.color : [],
          size: Array.isArray(productData.size) ? productData.size : [], // Store sizes as JSON array
        },
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
    }

    return { data, error };
  };

  const getProductsBySubCategory = async (subCategoryId) => {
    console.log("Fetching Products for Sub-Category ID:", subCategoryId); // Debugging

    const { data, error } = await supabaseClient
      .from("product") // Ensure correct table name
      .select("*")
      .eq("sub_cate_id", subCategoryId); // Filter by sub-category ID

    console.log(data, "data");
    if (error) {
      console.error("Supabase Fetch Error:", error);
    }

    return { data, error };
  };

  // Edit a product by its ID
  const editProductById = async (productId, updatedData) => {
    console.log("Editing Product ID:", productId, "Updated Data:", updatedData); // Debugging

    const { data, error } = await supabaseClient
      .from("product")
      .update({
        ...updatedData,
        color: updatedData.color ? JSON.stringify(updatedData.color) : "[]", // Convert color to JSON array
        size: updatedData.size ? JSON.stringify(updatedData.size) : "[]", // Convert size to JSON array
      })
      .eq("id", productId);

    if (error) {
      console.error("Supabase Update Error:", error);
    }

    return { data, error };
  };
  // Delete a product by its ID
  const deleteProductById = async (productId) => {
    console.log("Deleting Product ID:", productId); // Debugging

    const { data, error } = await supabaseClient
      .from("product")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Supabase Delete Error:", error);
    }

    return { data, error };
  };

  return {
    addProduct,
    getProductsBySubCategory,
    editProductById,
    deleteProductById,
  };
}
