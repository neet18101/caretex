"use client"; // For Next.js App Router (optional)

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

function OurPartners() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".slider-track", {
        x: "-50%", // Moves it left by half
        duration: 10, // Speed of animation
        ease: "linear",
        repeat: -1, // Infinite loop
      });
    }, sliderRef);

    return () => ctx.revert(); // Clean up GSAP animation on unmount
  }, []);

  return (
    <section className="relative bg-[#F4F4F4] py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-screen-xl mx-auto px-6 py-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Our Partners</h1>
          <p className="text-lg mb-8">
            We are proud to collaborate with some of the most well-known brands
            in the medical industry.
          </p>

          {/* GSAP Autoplaying Slider */}
          <div className="relative overflow-hidden w-full" ref={sliderRef}>
            <div className="slider-track flex items-center gap-10 whitespace-nowrap">
              {/* Duplicate Images for Seamless Looping */}
              {[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiChZNq55ji8Z4WGpQmv9-f4MrwPZ-FAFIQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncG4LSx5Dqt8rzO6kCnVoaIDWVt3XnCcHQA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8B19aM_d3pe641dioliVYUiP0K5W4eZU7dw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiChZNq55ji8Z4WGpQmv9-f4MrwPZ-FAFIQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDP1uA4DQdZEjFdJrNQTKUhfdZl39v6ENPtQ&s",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Brand ${index + 1}`}
                  className="w-40 h-auto"
                />
              ))}

              {/* Duplicate for seamless looping */}
              {[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiChZNq55ji8Z4WGpQmv9-f4MrwPZ-FAFIQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncG4LSx5Dqt8rzO6kCnVoaIDWVt3XnCcHQA&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8B19aM_d3pe641dioliVYUiP0K5W4eZU7dw&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLiChZNq55ji8Z4WGpQmv9-f4MrwPZ-FAFIQ&s",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDP1uA4DQdZEjFdJrNQTKUhfdZl39v6ENPtQ&s",
              ].map((src, index) => (
                <img
                  key={index + 5}
                  src={src}
                  alt={`Brand ${index + 6}`}
                  className="w-40 h-auto"
                />
              ))}
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="text-center mt-10">
            <Link
              href="/contact-us"
              className="bg-[#f59f8b] text-white px-6 py-2 rounded-md hover:bg-[#e58674] transition"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurPartners;
