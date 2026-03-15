export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            Khula Youth Camps
          </h3>

          <p>
            Providing life-changing outdoor learning experiences
            for young people.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>Programs</li>
            <li>About Us</li>
            <li>Gallery</li>
            <li>Sponsor a Learner</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">
            Contact
          </h3>

          <p>Email: info@khulacamps.org</p>
          <p>South Africa</p>
        </div>

      </div>

      <div className="text-center mt-10 text-sm text-gray-500">
        © 2026 Khula Youth Camps
      </div>

    </footer>
  )
}