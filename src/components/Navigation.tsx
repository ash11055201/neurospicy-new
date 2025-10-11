'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Neurospicy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="#about" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About Me
              </Link>
              <Link href="#order" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Order
              </Link>
              <Link href="#sample" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Book Sample
              </Link>
              <Link href="#share" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Share Your Story
              </Link>
              <Link href="#contact" className="text-gray-800 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
              <Link href="/" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="#about" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                About Me
              </Link>
              <Link href="#order" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Order
              </Link>
              <Link href="#sample" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Book Sample
              </Link>
              <Link href="#share" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Share Your Story
              </Link>
              <Link href="#contact" className="text-gray-800 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
