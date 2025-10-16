'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import CartIcon from './CartIcon'
import CartModal from './CartModal'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (section: string) => {
    if (pathname === '/checkout') {
      // If on checkout page, navigate to home page with section
      router.push(`/#${section}`)
    } else {
      // If on home page, scroll to section
      if (section === 'home') {
        // Scroll to top of page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        }
      }
    }
    setIsMenuOpen(false) // Close mobile menu
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              Neurospicy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1">
            <div className="ml-10 flex items-center justify-center space-x-6">
              <Link href="/" className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Home
              </Link>
              <button onClick={() => handleNavigation('about')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                About Me
              </button>
              <button onClick={() => handleNavigation('order')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Order
              </button>
              {/* <button onClick={() => handleNavigation('sample')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Book Sample
              </button> */}
              {/* <button onClick={() => handleNavigation('photos')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Photos
              </button> */}
              <button onClick={() => handleNavigation('share')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Share Your Story
              </button>
              <button onClick={() => handleNavigation('contact')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer">
                Contact
              </button>
              <button 
                onClick={() => window.location.href = '/checkout'}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Buy Book
              </button>
              <CartIcon onClick={() => setIsCartOpen(true)} />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartIcon onClick={() => setIsCartOpen(true)} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-orange-600 focus:outline-none focus:text-orange-600 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => handleNavigation('home')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Home
              </button>
              <button onClick={() => handleNavigation('about')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                About Me
              </button>
              <button onClick={() => handleNavigation('order')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Order
              </button>
              {/* <button onClick={() => handleNavigation('sample')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Book Sample
              </button> */}
              {/* <button onClick={() => handleNavigation('photos')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Photos
              </button> */}
              <button onClick={() => handleNavigation('share')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Share Your Story
              </button>
              <button onClick={() => handleNavigation('contact')} className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 block px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer w-full text-left">
                Contact
              </button>
              <button 
                onClick={() => window.location.href = '/checkout'}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer w-full text-center mt-2"
              >
                Buy Book
              </button>
            </div>
          </div>
        )}
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}
