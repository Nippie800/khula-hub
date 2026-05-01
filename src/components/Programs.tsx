"use client";

import { motion } from "framer-motion";

const programs = [
  {
    number: "01",
    title: "Outdoor Adventure",
    desc: "Hiking, camping, and hands-on outdoor exploration. Learners face real challenges in nature — and discover what they are capable of.",
    points: [
      "Builds physical resilience",
      "Fosters real teamwork",
      "Disconnects from screens",
    ],
  },
  {
    number: "02",
    title: "Leadership Development",
    desc: "Structured activities that push learners to step up, speak up, and take responsibility — skills that last beyond camp.",
    points: [
      "Builds confidence",
      "Improves communication",
      "Develops integrity",
    ],
  },
  {
    number: "03",
    title: "Personal Growth",
    desc: "A safe space for learners to reflect, identify strengths, and start shaping who they want to become.",
    points: [
      "Encourages self-awareness",
      "Builds independence",
      "Strengthens friendships",
    ],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="bg-[#f4f0ea] py-16">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2f6f68]">
            What we offer
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#3a2a1c]">
            Our camp programmes
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Every Khula camp is built around three pillars. Together they shape confident, grounded young people.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#e7e0d6] bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-2xl font-light text-[#d2c5b5]">
                {p.number}
              </div>

              <h3 className="mt-2 text-lg font-semibold text-[#3a2a1c]">
                {p.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {p.desc}
              </p>

              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {p.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}