"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    // GSAP Infinite Animation for Left-to-Right Movement
    gsap.to(badgeRef.current, {
      x: 20, // Move 20px to the right
      duration: 2, // Duration of the animation
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse the animation
      ease: "power1.inOut", // Smooth easing
    });
  }, []);

  useEffect(() => {
    // GSAP Scroll Animation for Section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Trigger when 80% of the section enters the viewport
        },
      }
    );

    // GSAP Scroll Animation for Image
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%", // Trigger when 90% of the image enters the viewport
          once: true, // Trigger only once
        },
      }
    );
  }, []);

  return (
    <div className="bg-white py-8 lg:py-16" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:items-center">
          {/* Left Section: Image */}
          <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0">
            <div className="relative flex justify-center">
              <img
                ref={imageRef}
                src="/assets/images/about2.png"
                alt="Patient Care"
                className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-[20px] lg:rounded-[40px] shadow-md"
              />
              <div
                ref={badgeRef}
                className="absolute bottom-4 right-4 transform translate-y-1/2 bg-white p-4 md:p-3 rounded-lg flex items-center space-x-4 shadow-lg"
              >
                <img
                  src="/assets/images/icon-experience.svg"
                  alt="Experience Icon"
                  className="w-8 h-8 md:w-12 md:h-12"
                />
                <div>
                  <h3 className="text-xl md:text-3xl font-bold text-gold">
                    25<span className="text-primary">+</span>
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    years of experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="w-full lg:w-1/2 lg:pl-12">
            <div className="text-left">
              <span className="text-xs md:text-sm uppercase bg-gray-100 text-primary font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-block border border-[#6b2a2e]">
                About Us
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gold leading-tight">
                We Are The Best For <br />
                <span className="text-[#f59f8b]">Patient Care</span>
              </h2>
              <p className="mt-6 text-gray-600 text-sm md:text-base lg:text-lg leading-[1.8] text-justify">
                Care-tex is a rehabilitation and orthopedic manufacturing
                company based in Lucknow, Uttar Pradesh. Care-tex was
                established in the year 2000 and as the name states, it was
                formed with the motive to provide care and comfort to its user
                with the help of textile at minimum cost. The organization has
                shown a very rapid and healthy growth since its inception, and  
                it’s one of the key companies in India providing good quality
                products at a reasonable price.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/assets/images/icon-about-us-1.svg"
                  alt="Nutrition"
                  className="w-6 md:w-8 h-6 md:h-8"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  Nutrition Strategies
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="/assets/images/icon-about-us-2.svg"
                  alt="Proactive"
                  className="w-6 md:w-8 h-6 md:h-8"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  Be Proactive
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="/assets/images/icon-about-us-3.svg"
                  alt="Workout"
                  className="w-6 md:w-8 h-6 md:h-8"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  Workout Routines
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="/assets/images/icon-about-us-4.svg"
                  alt="Motivation"
                  className="w-6 md:w-8 h-6 md:h-8"
                />
                <h3 className="text-sm md:text-base font-semibold text-gray-800">
                  Support & Motivation
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
