'use client'

import { useState } from 'react'
import ResponsiveImage from './ResponsiveImage'

export default function GallerySection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    {
      src: '/IMG_0391.webp',
      alt: 'First Book',
      title: 'First Book: Dyslexia: How Do We Learn',
      fallback: '/IMG_0391.jpg',
      useResponsive: true
    },
    {
      src: '/IMG_5962.jpeg',
      alt: 'Dinny McDinny my aboriginal father and me',
      title: 'Dinny McDinny my aboriginal father and me'
    },
    {
      src: '/IMG_6496.jpeg',
      alt: 'Dugong killed in The Gulf of Carpentaria facing out to sea so its sprites returned to other animals',
      title: 'Dugong killed in The Gulf of Carpentaria facing out to sea so its sprites returned to other animals'
    },
    {
      src: '/IMG_6504.jpeg',
      alt: 'Dinny McDinny Making Spear, Aboriginal Elder Yanyuwa people',
      title: 'Dinny McDinny Making Spear, Aboriginal Elder Yanyuwa people'
    },
    {
      src: '/IMG_6506.jpeg',
      alt: "Me Making a Spear, Police Lagon McArthur River 80's",
      title: "Me Making a Spear, Police Lagon McArthur River 80's"
    },
    {
      src: '/IMG_6713.jpeg',
      alt: 'Family and friends visiting McArthur River',
      title: 'Family and friends visiting McArthur River'
    },
    {
      src: '/IMG_6903.webp',
      alt: 'Nancy McDinny Grand Doughty Dinny McDinny and me in King Island',
      title: 'Nancy McDinny Grand Doughty Dinny McDinny and me in King Island',
      fallback: '/IMG_6903.jpeg',
      useResponsive: true
    },
    {
      src: '/painting1.jpg',
      alt: 'Painting of cover book by Finn and Daen',
      title: 'Painting of cover book by Finn and Daen'
    },
    {
      src: '/painting2.jpg',
      alt: 'Painting the book cover',
      title: 'Painting the book cover'
    },
    {
      src: '/painting3.jpg',
      alt: 'Painting the book cover',
      title: 'Painting the book cover'
    },
    {
      src: '/john surfing.jpg',
      alt: 'Surfing at Uluwatu Bali',
      title: 'Catching waves at the legendary surf break of Uluwatu in Bali'
    },
    {
      src: '/john surfing 2.jpg',
      alt: 'Surfing at Uluwatu Bali',
      title: 'Catching waves at the legendary surf break of Uluwatu in Bali'
    },
    {
      src: '/Mike Nemesvary.png',
      alt: 'Mike Nemesvary former Bond stuntman',
      title: 'Mike Nemesvary, a former Bond stuntman, whom I cared for as a nurse after he broke his back'
    },
    {
      src: '/Mike Nemesvary.jpg',
      alt: 'Mike Nemesvary in London',
      title: 'Mike Nemesvary, whom I worked as a nurse for in London'
    },
    {
      src: '/working bee.jpg',
      alt: 'Working bee at Wollangarra',
      title: 'My children participating in a working bee at Wollangarra'
    },
    {
      src: '/Damper and fish.jpg',
      alt: 'Preparing damper and fish',
      title: 'Anny and Nancy McDinny getting ready to prepare damper and fish'
    },
    {
      src: '/camping.jpg',
      alt: 'Camping with tents',
      title: 'Camping with tents, an experience I would rather avoid'
    },
    {
      src: '/Eileen McDinny.jpg',
      alt: 'Eileen McDinny at Borroloola',
      title: 'Eileen McDinny, my Aboriginal mother, at Borroloola'
    },
    {
      src: '/rock climbing.jpg',
      alt: 'Rock climbing at Mount Arapiles',
      title: 'Rock climbing at Mount Arapiles, where the motto is: if you are not flying, you are not trying'
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
    <section id="gallery" className="pt-8 pb-4 bg-gradient-to-br from-gray-50 to-orange-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
                    <ResponsiveImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
                      className="object-cover rounded-lg"
                      priority={index === 0}
                      fallback={(image as any).fallback}
                      useResponsive={(image as any).useResponsive || false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold">{image.title}</h3>
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
              aria-label={`View image ${index + 1}: ${image.title}`}
              aria-current={index === currentImageIndex ? "true" : undefined}
            >
              <ResponsiveImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover group-hover:brightness-110 transition-all duration-300"
                priority={false}
                fallback={(image as any).fallback}
                useResponsive={(image as any).useResponsive || false}
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
