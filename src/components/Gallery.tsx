import Image from "next/image";
import Reveal from "./Reveal";

const images = [
  "/images/gallery1.png",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.png",
  "/images/gallery6.jpg",
];

export default function Gallery() {
  return (
    <section className="py-20" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Moments from Khula Camp</h2>
            <p className="mt-3 text-sm text-gray-600">
              A glimpse into the adventure, friendship, and growth that make camp unforgettable.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <Reveal key={src} delay={index * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl shadow-sm">
                <Image
                  src={src}
                  alt={`Khula gallery image ${index + 1}`}
                  width={500}
                  height={360}
                  className="h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}