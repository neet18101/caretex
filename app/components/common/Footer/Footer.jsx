

import Link from "next/link";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <Link href="/">
                        <img src="/assets/care-text-logo.png" alt="CareTex Logo" width="150px" />
                    </Link>
                    <p className="text-sm mt-2 opacity-75">
                        CareTex - Your trusted provider of medical support products.
                    </p>
                    <p className="text-sm opacity-75">
                        We specialize in high-quality medical tools designed to aid recovery and provide comfort, including back support belts, neck bands, knee supports, and more.
                    </p>
                    
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <nav className="flex flex-col space-y-2">
                        <Link href="/about-us" className="hover:text-[#f59f8b]">About Us</Link>
                        <Link href="/products" className="hover:text-[#f59f8b]">Our Products</Link>
                        <Link href="/customer-reviews" className="hover:text-[#f59f8b]">Customer Reviews</Link>
                        <Link href="/blog" className="hover:text-[#f59f8b]">Health Blog</Link>
                        <Link href="/contact-us" className="hover:text-[#f59f8b]">Contact Us</Link>
                    </nav>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Our Products</h3>
                    <p><strong>Back Support Belts</strong> - Ergonomic designs for lumbar support.</p>
                    <p><strong>Neck Bands</strong> - Comfortable neck support for pain relief.</p>
                    <p><strong>Knee Supports</strong> - Stability and comfort for knee joints.</p>
                    <p><strong>Wrist & Ankle Braces</strong> - Durable support for daily activities.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
                    <p>
                        <span className="font-semibold">📞</span> +91-9876543210, 1800-123-4567
                    </p>
                    <p>
                        <span className="font-semibold">✉</span> support@caretex.com
                    </p>
                </div>
            </div>
            <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} CareTex. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;