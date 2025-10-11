
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Welcome to
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-blue-600 mb-6">
              Neurospicy
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              dedicated to breaking down the barriers of Dyslexia and ADHD
            </p>
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
              through the inspiring story of, <span className="font-semibold text-blue-600">John O&apos;Shea</span>.
            </p>
          </div>

          {/* Book Cover Placeholder */}
          <div className="mb-8">
            <div className="inline-block bg-white rounded-lg shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="w-64 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">Neurospicy</div>
                  <div className="text-sm">by John O&apos;Shea</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Read Sample Now
            </button>
          </div>

          {/* Main Quote */}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              I have faced
            </h3>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              the highs of success and the lows of failure, and I hope by sharing some of these ups and downs and how it related to my Dyslexia and ADHD which I refer in the book being Spicy, it might help others.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
