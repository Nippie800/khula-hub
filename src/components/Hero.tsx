import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center">

      <Image
        src="/images/camp-hero.jpg"
        alt="Khula Youth Camp"
        fill
        priority
        className="object-cover brightness-75"
      />

      <div className="relative text-center text-white max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Young Minds Through Adventure
        </h1>

        <p className="text-lg md:text-xl mb-8">
          Khula Youth Camps help young people build confidence,
          leadership and lifelong friendships through outdoor
          experiences.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
            Register Your Child
          </button>

          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Sponsor a Learner
          </button>
        </div>
      </div>
    </section>
  )
}