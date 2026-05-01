"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section id="team" className="bg-[#ede7de] py-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-10 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2f6f68]">
            The people
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#3a2a1c]">
            Meet the team behind Khula
          </h2>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            We’re a small, committed group who believe deeply in what outdoor
            experiences can do for young people. Every person on this team shows up
            because they care — not because it’s a job.
          </p>

          <div className="mt-6 space-y-4 text-sm text-gray-700">
            <div>✔ Registered NPC — South Africa</div>
            <div>✔ Serving Grades 8–11</div>
            <div>✔ 100% of funds go to camp operations</div>
          </div>
        </div>

        {/* RIGHT SIDE (TEAM CARDS) */}
        <div className="space-y-4">

          {/* MAIN PERSON */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#e0d7cc] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                <Image
                  src="/team/khulaRep-Photoroom.jpg"
                  alt="Khula team member"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="font-semibold text-[#3a2a1c]">
                  Khula Team Member
                </div>
                <div className="text-xs text-[#2f6f68]">
                  Marketing & Social Media
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Leads camp marketing and manages social media — sharing moments that
              reflect Khula’s values with families, sponsors, and the wider community.
            </p>
          </motion.div>

          {/* PLACEHOLDER 2 */}
          <div className="rounded-2xl border border-dashed border-[#d6cdc3] p-5 text-sm text-gray-500">
            Representative 2 — Coming soon
          </div>

          {/* PLACEHOLDER 3 */}
          <div className="rounded-2xl border border-dashed border-[#d6cdc3] p-5 text-sm text-gray-500">
            Representative 3 — Coming soon
          </div>

          {/* CTA BOX */}
          <div className="rounded-2xl border border-[#cfe5df] bg-[#e8f5f2] p-5">
            <p className="text-sm text-[#2f6f68] font-semibold">
              Want to be part of this?
            </p>
            <p className="mt-1 text-sm text-gray-700">
              We’re always looking for people passionate about working with young people.
            </p>

            <a
              href="/contact"
              className="mt-3 inline-block rounded-full border border-black px-4 py-2 text-sm font-semibold"
            >
              Get involved →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}