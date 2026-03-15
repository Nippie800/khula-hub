import Image from "next/image"

export default function About() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <Image
            src="/images/about-camp.jpg"
            alt="About Khula Camp"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            About Khula Youth Camps
          </h2>

          <p className="text-gray-700 mb-4">
            Khula Youth Camps helps young people grow into confident,
            resilient leaders through outdoor adventures and mentorship.
          </p>

          <p className="text-gray-700 mb-6">
            Our programs combine nature, teamwork, and leadership
            development to create unforgettable learning experiences
            for learners.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Learn More
          </button>
        </div>

      </div>
    </section>
  )
}