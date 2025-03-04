"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HomeContact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "power3.out",
      }
    );
  }, []);

  const contactItems = [
    {
      imgSrc: "/assets/images/icon-home-contact-us-1.svg",
      title: "Expert Therapists",
      text: "Our team of licensed and certified physiotherapists",
    },
    {
      imgSrc: "/assets/images/icon-home-contact-us-2.svg",
      title: "Emergency Service",
      text: "Our emergency physiotherapy services are designed to address",
    },
    {
      imgSrc: "/assets/images/icon-home-contact-us-3.svg",
      title: "Free Consultant",
      text: "Our mission is to enhance the quality of life of our patients",
    },
  ];

  return (
    <section
      className="py-16 bg-gray-100"
      style={{ backgroundImage: "url('/assets/team_bg.jpg')" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          ref={sectionRef}
        >
          {contactItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition duration-500 transform hover:scale-105    
              border border-[1px] border-[#6b2a2f] p-4 rounded-md"
            >
              {/* Icon */}
              <div className="w-16 h-16 mb-4">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-full"
                />
              </div>
              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
