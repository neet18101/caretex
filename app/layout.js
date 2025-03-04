"use client";

import { useEffect } from "react";
import { Mulish } from "next/font/google";
import 'lenis/dist/lenis.css';
import "./globals.css";
import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });
  }, []);

  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
