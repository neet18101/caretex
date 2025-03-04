"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ProductCatalogue = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <>
      <section
        className="relative bg-white py-16"
        style={{ backgroundImage: "url('/assets/process_bg_1.jpg')" }}
      >
        <div
          className="container mx-auto px-6 lg:px-16"
          // Fixed background image issue
        >
          {/* Section Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#6b2a2e]">CARE-TEX</h1>
            <p className="text-lg text-gray-500">
              The Science of Rehabilitation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Animated Image */}
            <div className="relative">
              <div ref={imageRef} className="w-full max-w-md mx-auto lg:ml-16">
                <img
                  src="/assets/runner.webp"
                  alt="Runner"
                  className="rounded-xl drop-shadow-[5px_10px_10px_gray]"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="text-left">
                <span className="text-xs md:text-sm uppercase bg-gray-100 text-primary font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-block border border-[#6b2a2e]">
                  Our Mission is Patient's Care
                </span>

                <h3 className="mt-4 text-2xl sm:text-3xl lg:text-3xl font-bold text-[#d4af37] leading-tight">
                  Care-Tex: Excellence in Rehabilitation <br />
                  <span className="text-[#f59f8b]">
                    & Orthopedic Manufacturing
                  </span>
                </h3>

                <p className="mt-6 text-gray-600 text-sm md:text-base lg:text-lg leading-[1.8] text-justify">
                  Care-Tex is a premier manufacturer, exporter, and supplier of
                  orthopedic rehabilitation products, fracture aids, and
                  hospital products in India and overseas. The company adheres
                  to international quality standards, providing state-of-the-art
                  manufacturing for rehabilitation support, braces, and
                  orthopedic splints.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                For any health-related manufacturing company, the first mantra
                is quality. Our prestigious certifications are proof of our
                commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center bg-gradient-to-r rounded-2xl overflow-hidden shadow-lg">
            {/* Left Side Content */}
            <div className="p-8 lg:w-1/2 text-white">
              <h6 className="flex items-center text-lg font-semibold uppercase mb-3">
                <span className="mr-2">✚</span> Welcome New Patient’s
              </h6>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                We’re Welcoming New <br /> Patients
              </h2>
              <p className="mt-4 text-lg text-white/90">
                A brief statement outlining the purpose and mission of the
                clinic. This can include the commitment to patient care,
                community health.
              </p>
              <div className="w-[220px] mt-6">
                <a
                  href="appointment.html"
                  className="bg-[rgb(255_164_143)] text-[#69292d] font-semibold px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-[#f59f8b] transition duration-300"
                >
                  <span>Book Appointment</span>
                  <span className="text-lg">➡</span>
                </a>
              </div>
            </div>
            {/* Right Side Image */}
            <div className="lg:w-1/2 relative">
              <img
                src="https://pixydrops.com/mediox-html/assets/images/resources/welcome-1-1.jpg"
                alt="Doctors Team"
                className="w-full h-80 lg:h-full object-cover rounded-r-2xl"
                style={{ clipPath: "ellipse(100% 85% at 100% 50%)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCatalogue;
