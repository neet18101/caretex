import { supabaseClient } from "@/utlis/SupabaseClient";

export const useSubCategory = () => {
  // Fetch subcategories where parent_id = categoryId
  const getSubCategories = async (categoryId) => {
    let { data, error } = await supabaseClient
      .from("categories")
      .select("id, name")
      .eq("parent_id", categoryId);
      console.log(data);

    return { data, error };
  };

  // Add a new subcategory
  const addSubCategory = async (name, parentId) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const { data, error } = await supabaseClient
      .from("categories")
      .insert([{ name,slug, parent_id: parentId }]).order("created_at", { ascending: true });

    return { data, error };
  };

  // Update a subcategory
  const updateSubCategory = async (subCategoryId, name) => {
    const { data, error } = await supabaseClient
      .from("categories")
      .update({ name })
      .eq("id", subCategoryId);

    return { data, error };
  };

  // Delete a subcategory
  const deleteSubCategory = async (subCategoryId) => {
    const { data, error } = await supabaseClient
      .from("categories")
      .delete()
      .eq("id", subCategoryId);

    return { data, error };
  };

  return { getSubCategories, addSubCategory, updateSubCategory, deleteSubCategory };
};
