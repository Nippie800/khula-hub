"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  {
    src: "/images/badge1-Photoroom.png",
    alt: "Experienced Youth Mentors badge",
    title: "Experienced Youth Mentors",
  },
  {
    src: "/images/badge2-Photoroom.png",
    alt: "Safe Outdoor Programs badge",
    title: "Safe Outdoor Programs",
  },
  {
    src: "/images/badge3-Photoroom.png",
    alt: "Life-Changing Experiences badge",
    title: "Life-Changing Experiences",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-[#eef3f1] py-14">
      <div className="mx-auto max-w-6xl px-4 text-center">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2f6f68]">
            Why families trust Khula
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            Built on mentorship, safety, and real growth
          </h2>
        </motion.div>

        {/* BADGES */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="flex flex-col items-center"
            >
              {/* BIG BADGE */}
              <Image
                src={badge.src}
                alt={badge.alt}
                width={220}
                height={220}
                className="h-auto w-[180px] sm:w-[200px] lg:w-[220px] object-contain transition duration-300"
              />

              {/* LABEL */}
              <p className="mt-4 text-sm font-semibold text-gray-700">
                {badge.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}