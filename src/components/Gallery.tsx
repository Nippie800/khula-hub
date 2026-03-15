import Image from "next/image"

export default function Gallery() {
  return (
    <section className="py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Moments from Khula Camp
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Image src="/images/gallery1.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

          <Image src="/images/gallery2.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

          <Image src="/images/gallery3.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

          <Image src="/images/gallery4.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

          <Image src="/images/gallery5.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

          <Image src="/images/gallery6.jpg" alt="camp" width={400} height={300} className="rounded-lg"/>

        </div>

      </div>
    </section>
  )
}