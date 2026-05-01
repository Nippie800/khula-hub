"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "About Us", href: "/#about" },
  { label: "Programmes", href: "/#programs" },
  { label: "Our Team", href: "/#team" },
  { label: "Gallery", href: "/#gallery" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f4f0ea]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
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

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#5b3a1f] transition hover:text-[#2f6f68]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/register"
            className="rounded-full border-2 border-black bg-[#74b8b0] px-5 py-2 text-sm font-bold text-[#5b3a1f] shadow-sm"
          >
            Join Us
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-black/10 bg-white/50 p-2 text-[#5b3a1f] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-[#f4f0ea] px-4 py-4 md:hidden">
          <div className="grid gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-2 text-sm font-semibold text-[#5b3a1f] hover:bg-white/60"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border-2 border-black bg-[#74b8b0] px-5 py-3 text-center text-sm font-bold text-[#5b3a1f]"
            >
              Join Us
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}