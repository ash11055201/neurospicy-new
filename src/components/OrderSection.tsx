"use client"

import { useRouter } from 'next/navigation'

export default function OrderSection() {
  const router = useRouter()

  const handleGetBookNow = () => {
    router.push('/checkout')
  }
  return (
    <section id="order" className="pt-8 pb-20 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Don&apos;t miss it!
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - ADHD/Dyslexic Section */}
          <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 rounded-lg shadow-xl p-8 border-l-4 border-orange-500/70">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              Given that <span className="text-red-700">ADHD</span> and <span className="text-red-700">Dyslexic</span> individuals
            </h3>
            <p className="text-base text-gray-800 leading-relaxed">
              can be highly effective in senior and leadership positions, and 30% to 40% of entrepreneurs are ADHD or Dyslexic, my aim is to highlight the advantages and disadvantages but always focusing on strengths of being <span className="font-bold text-red-700">Spicy Brain</span>.
            </p>
          </div>

          {/* Right Column - More About Neurospicy */}
          <div className="bg-gradient-to-l from-yellow-50/80 to-orange-50/80 rounded-lg shadow-xl p-8 border-r-4 border-yellow-600/70">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              More About <span className="text-orange-700">Neurospicy</span>
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              This is not an autobiography as I don&apos;t think my life is that interesting, and not something to spend good money on when a bottle of wine could be more beneficial! It&apos;s about my 58 years of experience with dyslexia and ADHD, how I have changed - I have a far greater understanding and respect for my gift, my neurodivergence, <span className="font-semibold text-orange-700">spicy brain</span>.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              I hope this adventure can help others navigate the world of Dyslexia and ADHD in a positive way.
            </p>
          </div>
        </div>

        {/* CTA Button Section */}
        <div className="text-center">
          <button 
            onClick={handleGetBookNow}
            className="bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Get The Book Now
          </button>
        </div>
      </div>
    </section>
  )
}
