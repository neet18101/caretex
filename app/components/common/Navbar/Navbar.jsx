"use client";
import RightArrow from "@/app/assets/RightArrow";
import { useEffect, useState } from "react";
import { getCategoriesWithSubcategories } from "@/hooks/useAddCategory";
import { supabaseClient } from "@/utlis/SupabaseClient";
import Link from "next/link";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const fetchCategories = async () => {
    const { data, error } = await supabaseClient
      .from("categories")
      .select("id, name, subcategories:categories(id, name)")
      .is("parent_id", null) // Get only parent categories
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Failed to fetch categories", error);
    } else {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`bg-gray-900 text-white py-2 px-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-2 text-sm">
              <img width={25} height={25} alt="email" src="/assets/email.png" />
              <span>caretexaid@gmail.com |</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a
                href="https://wa.me/+917800311945"
                target="_blank"
                className="flex items-center gap-2"
              >
                <img
                  width={25}
                  height={25}
                  alt="WhatsApp"
                  src="/assets/wp.png"
                />
                <span>+91 7800311945 |</span>
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a href="tel:+918076356808" className="flex items-center gap-2">
                <img width={25} height={25} alt="Call" src="/assets/call.png" />
                <span>+91 0522-4004633</span>
              </a>
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm">
                <img
                  height={30}
                  width={30}
                  alt="currency"
                  src="/svg/india.svg"
                />
                <span>India</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navbar Below Header */}
      <div
        className={`sticky top-[30px] bg-white shadow-md z-40 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 px-6">
          <a href="/">
            <img alt="logo" width="150px" src="/assets/care-text-logo.png" />
          </a>
          <nav className="lg:flex lg:items-center lg:space-x-6 hidden">
            <ul className="lg:flex lg:space-x-6">
              <li>
                <a
                  className="hover:text-[#f59f8b] text-black text-lg font-semibold"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="relative group">
                <a
                  className="flex items-center gap-1 hover:text-[#f59f8b] text-black text-lg font-semibold"
                  href="/"
                >
                  Product
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 12 7.41"
                  >
                    <path
                      d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                      opacity="0.7"
                    />
                  </svg>
                </a>
                <ul className="z-10 absolute left-0 w-[250px] mt-2 bg-white text-black rounded shadow-lg opacity-0 invisible translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="relative group px-4 py-2 hover:bg-[#f59f8b] hover:text-[#fff]"
                    >
                      <button
                        className="w-full text-left flex justify-between items-center"
                        onMouseEnter={() => setActiveCategory(category.name)}
                      >
                        {category.name}
                        <RightArrow width={20} height={20} />
                      </button>
                      {/* Subcategory Dropdown */}
                      {activeCategory === category.name && (
                        <ul className="absolute left-full top-0 w-[200px] bg-white text-black rounded shadow-lg transition-all duration-300">
                          {category.subcategories.map((sub, i) => (
                            <li
                              key={i}
                              className="px-4 py-2 hover:bg-[#f59f8b] hover:text-[#fff]"
                            >
                              <Link
                                href={`/${String(category.name)
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${String(sub?.name)
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}?subId=${sub?.id}`}
                              >
                                {sub?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a
                  className="hover:text-[#f59f8b] text-black text-lg font-semibold"
                  href="/about-us"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#f59f8b] text-black text-lg font-semibold"
                  href="/contact-us"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/product-details/ginerva-top">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit={10}
                  strokeWidth={32}
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  strokeWidth={32}
                  d="M338.29 338.29L448 448"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
