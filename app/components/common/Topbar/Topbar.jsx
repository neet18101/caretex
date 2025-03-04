import React from "react";

function Topbar() {
  return (
    <>
      <header className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="flex items-center gap-2 text-sm">
              <img src="/assets/email.png" width={25} height={25} alt="email" />
              <span>caretexaid@gmail.com |</span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a
                href="https://wa.me/+917800311945"
                target="_blank"
                className="flex items-center gap-2"
              >
                <img
                  src="/assets/wp.png"
                  width={25}
                  height={25}
                  alt="WhatsApp"
                />
                <span>+91 7800311945 |</span>
              </a>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <a href="tel:+918076356808" className="flex items-center gap-2">
                <img src="/assets/call.png" width={25} height={25} alt="Call" />
                <span>+91 0522-4004633</span>
              </a>
            </p>
          </div>
          {/* Language & Currency */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Currency Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm">
                <img
                  height={30}
                  width={30}
                  src="/svg/india.svg"
                  alt="currency"
                />
                <span>India</span>
              
              </button>
              {/* Dropdown Menu */}
           
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;
