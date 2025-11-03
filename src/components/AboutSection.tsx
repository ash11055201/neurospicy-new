import Image from 'next/image'
import GallerySection from './GallerySection'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About John
          </h2>
          <p className="text-xl text-gray-600 italic max-w-3xl mx-auto">
            &ldquo;My mind is telling me you have already climbed this mountain so why go back?&rdquo;
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* John's Photo */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-4 transform hover:scale-105 transition-transform duration-500">
                <div className="relative">
                  <Image
                    src="/John Photo.jpg"
                    alt="John O'Shea - Author of Neurospicy"
                    width={400}
                    height={800}
                    className="rounded-lg shadow-lg w-full h-[450px] object-cover"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-bounce delay-500"></div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 30 Years Ago */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    30+
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-3">Over 30 years</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  John authored a book on dyslexia, <span className="font-semibold">&ldquo;Dyslexia: How Do We Learn&rdquo;</span>, which became a bestseller for four months, selling over 15,000 copies and being released in eight countries in the 1980&apos;s.
                </p>
              </div>

              {/* Now at 58 */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-500 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    58
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-3">Now, at 58</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  This book is a follow-up book that explores my journey over the last three decades with both dyslexia and, more recently, ADHD. This journey has been filled with massive successes, massive downfalls and failure and day to day challenges that people with Dyslexic and ADHD face every day.
                </p>
              </div>

              {/* Current Vision */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6 border-l-4 border-red-500 shadow-lg md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-3">With this new book</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  I want to push boundaries and create something innovative. My vision is to expand the project into a theater play and an educational, entertaining based game that will allow these mediums express the issue in a more realistic way than a book.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Story - Full Width */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            My life to date has been amazing.
          </h3>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start text-base">
              <span className="text-orange-500 mr-4 mt-1 text-lg">📚</span>
              <span>I wrote my first book called <span className="font-semibold text-orange-600">&ldquo;Dyslexia: How Do We Learn&rdquo;</span> in the 1980s.</span>
            </p>
            <p className="flex items-start text-base">
              <span className="text-orange-500 mr-4 mt-1 text-lg">🌏</span>
              <span>I&apos;ve lived with Aboriginals in far north Australia who now call me uncle.</span>
            </p>
            <p className="flex items-start text-base">
              <span className="text-orange-500 mr-4 mt-1 text-lg">✈️</span>
              <span>I&apos;ve travelled through the Middle East with nothing but a tent, Nepal, India, Pakistan, Iran, Syria, Jordan, Israel and all before I was 24 years old.</span>
            </p>
            <p className="flex items-start text-base">
              <span className="text-orange-500 mr-4 mt-1 text-lg">♻️</span>
              <span>I developed <a href="https://olliesworld.com/aus/index.html" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">Ollie Recycles</a>, an educational program for schools that teaches children about recycling, reducing, and reusing resources to create a more sustainable future.</span>
            </p>
            <p className="flex items-start text-base">
              <span className="text-orange-500 mr-4 mt-1 text-lg">🏔️</span>
              <span>I was a founding council member and chairman of <a href="https://wollangarra.org/" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">Wollangarra Outdoor Education Centre</a>, an independent, non-profit organization situated beside the Macalister River in Licola. Through outdoor education, Wollangarra provides a vital step towards a healthier environment, stronger community conservation in the nearby mountains, and happier young people. <a href="https://www.facebook.com/Wollangarra/" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">Learn more on Facebook</a>.</span>
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-lg p-8 text-white text-center shadow-2xl mb-16">
          <h3 className="text-2xl font-bold mb-6">The Power of Neurodivergent Minds</h3>
          
          {/* NASA Image Section */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/30">
                <Image
                  src="/Nasa.jpg"
                  alt="NASA Space Station - Symbol of Innovation and Problem-Solving"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <span className="text-black font-bold text-base">🚀</span>
                </div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-blue-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
              </div>
            </div>
          </div>

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

        {/* Photo Gallery Section */}
        <div className="mb-0">
          <GallerySection />
        </div>
      </div>
    </section>
  )
}
