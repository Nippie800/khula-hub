export default function Programs() {
  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold mb-12">
          Our Camp Programs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              Outdoor Adventure
            </h3>

            <p className="text-gray-600">
              Hiking, camping and outdoor exploration that build
              resilience and teamwork.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              Leadership Development
            </h3>

            <p className="text-gray-600">
              Activities designed to build confidence,
              leadership and communication skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">
              Personal Growth
            </h3>

            <p className="text-gray-600">
              Helping learners discover their strengths
              and develop independence.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}