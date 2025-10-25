'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function GallerySection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: '/IMG_0391.jpeg',
      alt: 'First Book',
      title: 'Dyslexia: How Do We Learn'
    },
    {
      src: '/IMG_5962.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    },
    {
      src: '/IMG_6496.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    },
    {
      src: '/IMG_6504.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    },
    {
      src: '/IMG_6506.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    },
    {
      src: '/IMG_6713.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    },
    {
      src: '/IMG_6903.jpeg',
      alt: 'Aboriginal community experience',
      title: 'Aboriginal Community'
    }
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <section id="gallery" className="py-8 bg-gradient-to-br from-gray-50 to-orange-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Photo <span className="bg-gradient-to-r from-orange-600/90 to-red-600/90 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            A visual journey through John's amazing life experiences
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="relative h-[500px] md:h-[600px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
                      <p className="text-lg opacity-90">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 group cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 group-hover:text-orange-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 group cursor-pointer"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 group-hover:text-orange-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-3 mb-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 group cursor-pointer ${
                index === currentImageIndex 
                  ? 'ring-4 ring-orange-500/90 scale-110 shadow-lg' 
                  : 'hover:scale-110 hover:shadow-lg opacity-70 hover:opacity-100 hover:ring-2 hover:ring-orange-300/50'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:brightness-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div className="text-center">
          <p className="text-gray-600">
            {currentImageIndex + 1} of {images.length}
          </p>
        </div>


      </div>
    </section>
  )
}
