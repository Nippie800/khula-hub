"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden">
      <Image
        src="/images/camp-hero.png"
        alt="Learners enjoying camp"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

      <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Khula Youth Camps
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
          >
            Empowering young minds through adventure, truth, and growth.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            Khula creates life-shaping camp experiences where learners build confidence,
            character, leadership, and healthy friendships in a safe and inspiring environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/register"
              className="rounded-full bg-[#74b8b0] px-6 py-3 text-sm font-bold text-[#4b2f1b] shadow-lg transition hover:-translate-y-0.5"
            >
              Register Your Child
            </a>
            <a
              href="/sponsor"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5"
            >
              Sponsor a Learner
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}