"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CounterSection = () => {
  const counters = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // GSAP Animation for Counters
    counters.current.forEach((counter) => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: counter.dataset.value,
          duration: 2,
          ease: "power3.out",
          snap: { innerText: 1 }, // Snap numbers to integers
          onUpdate: function () {
            counter.innerText = Math.ceil(this.targets()[0].innerText); // Round to integer
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Start animation when 80% of the section enters the viewport
          },
        }
      );
    });
  }, []);

  return (
    <section
      className="bg-[#001a3d] py-12 lg:py-16 text-white"
      ref={sectionRef}
      style={{
        backgroundImage: `url('https://clinicmaster.dexignzone.com/xhtml/medical/images/background/bg2.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right center",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center">
          {/* Total Order */}
          <div>
            <h3 className="text-4xl font-bold">
              <span
                ref={(el) => (counters.current[0] = el)}
                data-value="400"
                className="text-primary"
              >
                0
              </span>
              +
            </h3>
            <p className="text-sm lg:text-base">Total Order</p>
          </div>

          {/* Active Clients */}
          <div>
            <h3 className="text-4xl font-bold">
              <span
                ref={(el) => (counters.current[1] = el)}
                data-value="200"
                className="text-primary"
              >
                0
              </span>
              +
            </h3>
            <p className="text-sm lg:text-base">Active Clients</p>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-4xl font-bold">
              <span
                ref={(el) => (counters.current[2] = el)}
                data-value="10000"
                className="text-primary"
              >
                0
              </span>
              +
            </h3>
            <p className="text-sm lg:text-base">Team Members</p>
          </div>

          {/* Years of Experience */}
          <div>
            <h3 className="text-4xl font-bold">
              <span
                ref={(el) => (counters.current[3] = el)}
                data-value="25"
                className="text-primary"
              >
                0
              </span>
              +
            </h3>
            <p className="text-sm lg:text-base">Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
