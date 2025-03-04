"use client"; // Ensures GSAP runs only on the client side

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: "/assets/slider1.webp",
    title: "Premium Scrubs",
    description: "Discover the best medical scrubs for professionals.",
  },
  {
    image: "/assets/slider2.webp",
    title: "Comfort & Style",
    description: "A perfect blend of comfort and professional design.",
  },
  {
    image: "/assets/slider3.webp",
    title: "New Arrivals",
    description: "Shop our latest collection of trendy scrubs.",
  },
];

export default function HomeSlider() {
  const sliderRef = useRef(null);
  const textRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      let interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative w-full h-[700px] overflow-hidden"
      ref={sliderRef}
    >
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Text Animation */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <div ref={textRef} className="p-4">
          <h1 className="text-4xl font-bold">{slides[currentSlide].title}</h1>
          <p className="text-lg mt-2">{slides[currentSlide].description}</p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}
