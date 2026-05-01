"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -80; // offset for sticky navbar
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f4f0ea]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/khulalogoPhotoroom.png"
            alt="Khula logo"
            width={150}
            height={60}
            className="h-auto w-[110px] sm:w-[130px]"
            priority
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-semibold text-[#5b3a1f] hover:text-[#2f6f68]"
          >
            About Us
          </button>

          <button
            onClick={() => scrollToSection("programs")}
            className="text-sm font-semibold text-[#5b3a1f] hover:text-[#2f6f68]"
          >
            Programmes
          </button>

          <button
            onClick={() => scrollToSection("team")}
            className="text-sm font-semibold text-[#5b3a1f] hover:text-[#2f6f68]"
          >
            Our Team
          </button>

          <button
            onClick={() => scrollToSection("gallery")}
            className="text-sm font-semibold text-[#5b3a1f] hover:text-[#2f6f68]"
          >
            Gallery
          </button>
        </nav>

        {/* CTA */}
        <motion.a
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="/register"
          className="rounded-full border-2 border-black bg-[#74b8b0] px-5 py-2 text-sm font-bold text-[#5b3a1f] shadow-sm"
        >
          Join Us
        </motion.a>
      </div>
    </header>
  );
}