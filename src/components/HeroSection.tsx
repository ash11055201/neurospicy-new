
"use client"

import ResponsiveImage from './ResponsiveImage'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const handleDownloadSample = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/jigzaw-book-exstrate.docx';
    link.download = 'Neurospicy-Sample.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            {/* Welcome Text */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Welcome to
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600/90 to-red-600/90 bg-clip-text text-transparent mb-4">
                Neurospicy
              </h2>
              <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-6 italic">
                A Memoir Of Madness, Magic ADHD and Dyslexia
              </h3>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                Dedicated to breaking down the barriers of Dyslexia and ADHD through the inspiring story of, <span className="font-semibold text-orange-600/90">John O&apos;Shea</span>.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={handleDownloadSample}
                className="bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Read Sample Now
              </button>
              <button 
                onClick={() => router.push('/checkout')}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Get the Book Now
              </button>
            </div>

            {/* Main Quote */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-4xl mx-auto lg:mx-0">
              <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-4">
                In my experience
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Success and failure are two sides of the same coin. By sharing my personal experiences of both, especially as they relate to my dyslexia and ADHD (which I playfully call Spicy in the book), I hope to offer useful insights to others.
              </p>
            </div>
          </div>

          {/* Right Column - Book Cover */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="relative">
              {/* Book Cover with Enhanced Shadow */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500 hover:shadow-3xl">
                <div className="relative">
                  <ResponsiveImage
                    src="/book-cover.webp"
                    alt="Neurospicy Book Cover by John O'Shea"
                    width={400}
                    height={750}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="rounded-lg shadow-lg"
                    priority
                    fallback="/book-cover.jpg"
                    useResponsive={true}
                  />
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500/80 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500/80 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-400/80 rounded-full opacity-60 animate-bounce delay-500"></div>
            </div>
            {/* Artist Attribution */}
            <p className="text-center text-gray-600 text-sm mt-4 italic">
              Painted by Finn O&apos;Shea and Daen Calebrano
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
