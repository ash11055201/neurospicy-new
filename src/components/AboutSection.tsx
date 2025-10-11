export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About John
          </h2>
          <p className="text-xl text-gray-600 italic max-w-3xl mx-auto">
            &ldquo;My mind is telling me you have already climbed this mountain so why go back?&rdquo;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Timeline Section */}
          <div className="space-y-8">
            {/* 30 Years Ago */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  30+
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">Over 30 years</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                John authored a book on dyslexia, <span className="font-semibold">&ldquo;Dyslexia: How Do We Learn&rdquo;</span>, which became a bestseller for four months, selling over 15,000 copies and being released in eight countries in the 1980&apos;s.
              </p>
            </div>

            {/* Now at 58 */}
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  58
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">Now, at 58</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This book is a follow-up book that explores my journey over the last three decades with both dyslexia and, more recently, ADHD. This journey has been filled with massive successes, massive downfalls and failure and day to day challenges that people with Dyslexic and ADHD face every day.
              </p>
            </div>

            {/* Current Vision */}
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  ✨
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ml-4">With this new book</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                I want to push boundaries and create something innovative. My vision is to expand the project into a theater play and an educational, entertaining based game that will allow these mediums express the issue in a more realistic way than a book.
              </p>
            </div>
          </div>

          {/* Personal Story */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              My life to date has been amazing.
            </h3>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start">
                <span className="text-blue-500 mr-3">🌏</span>
                I&apos;ve lived with Aboriginals in far north Australia who now call me uncle.
              </p>
              <p className="flex items-start">
                <span className="text-blue-500 mr-3">✈️</span>
                I&apos;ve travelled through the Middle East with nothing but a tent, Nepal, India, Pakistan, Iran, Syria, Jordan, Israel and all before I was 24 years old.
              </p>
              <p className="flex items-start">
                <span className="text-blue-500 mr-3">🏔️</span>
                I am the founding Council member (ex Chairman) of <a href="https://wollangarra.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Wollangarra Outdoor Education Centre</a>, where down-to-earth adventure meets real-world education for young people.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">The Power of Neurodivergent Minds</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-lg">of CEOs have dyslexia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">35%</div>
              <div className="text-lg">of entrepreneurs have dyslexia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50%</div>
              <div className="text-lg">of NASA employees have dyslexia</div>
            </div>
          </div>
          <p className="mt-6 text-lg">
            Why does NASA employ dyslexic people? Their strengths translate into real-world success. They&apos;re deliberately recruited for their exceptional abilities in areas like 3D perception and creative problem-solving, skills so essential for space exploration.
          </p>
        </div>
      </div>
    </section>
  )
}
