"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import Image from "next/image";
import { supabaseClient } from "@/utlis/SupabaseClient";

const ShopByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("Nutra Supplements");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const swiperRef = useRef(null);
  const sliderRef = useRef(null);

  // useEffect(() => {
  //   fetch("/data.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data.categories);
  //       setProducts(data.products);
  //       setActiveCategory(data.categories[0].name);
  //     })
  //     .catch((error) => console.error("Error loading data:", error));
  // }, []);

  useEffect(() => {
    if (sliderRef.current) {
      // GSAP Animation for the slider
      gsap.fromTo(
        sliderRef.current.children,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeCategory]);

  const fetchCategories = async () => {
    // Fetch categories with subcategories
    const { data: categories, error: categoryError } = await supabaseClient
      .from("categories")
      .select(`id, name, subcategories:categories(id, name)`)
      .is("parent_id", null)
      .order("created_at", { ascending: true });

    if (categoryError) {
      console.error("Error fetching categories:", categoryError);
      return;
    }

    // Extract all subcategory IDs
    const subcategoryIds = categories
      .flatMap((category) => category.subcategories)
      .map((sub) => sub.id);

    // Fetch products related to subcategories
    let products = [];
    if (subcategoryIds.length > 0) {
      const { data: productData, error: productError } = await supabaseClient
        .from("product")
        .select("*")
        .in("sub_cate_id", subcategoryIds) // Assuming `subcategory_id` is the FK in `product` table
        .order("created_at", { ascending: true });

      if (productError) {
        console.error("Error fetching products:", productError);
      } else {
        products = productData;
      }
    }

    // Set state with categories and related products
    setCategories(categories);
    setProducts(products);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(products, "products");
  console.log(categories, "categories");

  return (
    <div className="bg-gray-100 py-8">
      {/* Categories */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Shop by Categories
        </h2>
        <div className="overflow-x-auto flex justify-center gap-4 py-2 px-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg shadow-md ${
                activeCategory === category.name
                  ? "bg-[#f59f8b] border border-[#e58674] text-white"
                  : "bg-white text-[#70292f]"
              } transition hover:bg-[#e58674] hover:text-white whitespace-nowrap`}
              onClick={() => setActiveCategory(category.name)}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 ">
        <div
          ref={sliderRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5"
        >
          {products &&
            products?.slice(0, 12)?.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 text-center border-2 border-[#70292f] rounded-[3px_50px] shadow-[1px_1px_4px_#e58674] w-[250px] md:w-[300px]"
              >
                <img
                  src={product.image_url}
                  alt={product.product_title}
                  width={500}
                  height={500}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">
                  {product.product_title}
                </h3>
                <div className="text-green-600 font-bold text-lg">
                  Rs. {product.price}{" "}
                  {/* <span className="line-through text-gray-500 text-sm">
                  Rs. {product.originalPrice}
                </span> */}
                </div>
                <button className="mt-4 px-4 py-2 bg-[#f59f8b] text-white rounded-lg text-sm hover:bg-[#e58674]">
                  View Details
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
