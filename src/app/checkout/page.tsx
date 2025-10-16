"use client"

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'

export default function CheckoutPage() {
  const [selectedFormat, setSelectedFormat] = useState('ebook')
  const [quantity, setQuantity] = useState(1)
  const [quantityInput, setQuantityInput] = useState('1')
  const [activeTab, setActiveTab] = useState('description')
  const [isAnimating, setIsAnimating] = useState(false)
  const { addToCart } = useCart()

  const pricing = {
    ebook: 29.99,
    paperback: 35.00,
    hardcover: 40.00
  }

  const handleCheckout = () => {
    // Here you would integrate with your payment processor
    // For now, we'll just show an alert
    alert(`Redirecting to payment for ${quantity} ${selectedFormat}(s) - $${(pricing[selectedFormat as keyof typeof pricing] * quantity).toFixed(2)}`)
  }

  const handleGooglePay = () => {
    alert('Google Pay integration would go here')
  }

  const handleAddToCart = () => {
    const sku = selectedFormat === 'ebook' ? '3001' : selectedFormat === 'paperback' ? '1001' : '2001'
    addToCart({
      title: 'Neurospicy',
      format: selectedFormat,
      price: pricing[selectedFormat as keyof typeof pricing],
      quantity: quantity,
      sku: sku
    })
    
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  const handlePayPal = () => {
    alert('PayPal integration would go here')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Book Cover */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="relative">
              <Image
                src="/book-cover.jpg"
                alt="Neurospicy Book Cover by John O'Shea"
                width={400}
                height={600}
                className="rounded-lg shadow-lg mx-auto"
                priority
              />
              {/* Magnifying glass icon */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-red-50">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Purchase */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Category */}
            <div className="text-sm text-gray-500 mb-2">Books</div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Neurospicy by John O'Shea</h2>
            
            {/* Price */}
            <div className="text-3xl font-bold text-orange-600 mb-6">${pricing[selectedFormat as keyof typeof pricing]}</div>
            
            {/* Format Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
              >
                <option value="ebook">eBook - $29.99</option>
                <option value="paperback">Paperback - $35.00</option>
                <option value="hardcover">Hardcover - $40.00</option>
              </select>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantityInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuantityInput(value);
                    
                    if (value === '') {
                      setQuantity(1);
                    } else {
                      const numValue = parseInt(value);
                      if (!isNaN(numValue) && numValue >= 1) {
                        setQuantity(numValue);
                      }
                    }
                  }}
                  onBlur={() => {
                    if (quantityInput === '' || parseInt(quantityInput) < 1) {
                      setQuantityInput('1');
                      setQuantity(1);
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                />
              </div>
              <div className="flex items-end relative">
                <button 
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  ADD TO CART
                </button>
                
                {/* Flying Animation */}
                {isAnimating && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="flying-item animate-fly-to-cart">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <button
                onClick={handleGooglePay}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-white font-bold">G</span>
                <span>Pay</span>
              </button>
              
              <button
                onClick={handlePayPal}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-blue-600 font-bold">PayPal</span>
              </button>
            </div>

            {/* SKU and Category */}
            <div className="mt-6 text-sm text-gray-500">
              <div>SKU: #{selectedFormat === 'ebook' ? '3001' : selectedFormat === 'paperback' ? '1001' : '2001'}</div>
              <div>Category: Books</div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'additional'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab('distribution')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'distribution'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews (0)
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Item Weight:</span>
                    <span className="ml-2 text-gray-600">350 grams</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">5.5" x 8.5"</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">0.350 oz</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">14 × 21 × 2 cm</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Format:</span>
                    <span className="ml-2 text-gray-600">E-book, Audiobook, Hard Book</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div className="space-y-8">
                {/* Platforms */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Platforms:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Amazon', 'B&N', 'Kobo', 'iBooks', 'Scribd', 'Tolino', 'Walmart', 'Target', 'Chapter'].map((platform) => (
                      <div key={platform} className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                        <span className="text-gray-700 font-medium">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paperback Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Paperback Submission over:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['Adlibris', 'Agapea', 'Amazon.co.uk', 'Aphrohead', 'Blackwell', 'Book Depository Ltd', 'Books Express', 'Coutts Information Services Ltd', 'Designarta Books', 'Eden Interactive Ltd', 'Foyles', 'Gardners', 'Trust Media Distribution (formerly STL)', 'Mallory International', 'Paperback Shop Ltd', 'Superbookdeals', 'The Book Community Ltd', 'Waterstones', 'Wrap Distribution'].map((platform) => (
                      <div key={platform} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ebook Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Ebook Submission over:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {['24Symbols', 'Ainosco', 'Amazon*', 'Apple**', 'Barnes & Noble Nook', 'Bibliotheca', 'BibliU', 'Bolinda', 'Bookmate', 'Chegg', 'De Marque', 'eBooks.com', 'EBSCO', 'fable', 'Follett/B&T', 'Gardners', 'Glose', 'hoopla', 'Hummingbird', 'iGroup', 'ITSI', 'Kobo Plus', 'Kortex', 'Libreka', 'Libri.de', 'LitRes', 'Mackin', 'Odilo', 'OverDrive', 'Perlego', 'Perusall', 'ProQuest', 'Publica.la', 'RedShelf', 'Scribd', 'SpoonRead', 'Storytel', 'VitalSource', 'WF Howes', 'Wheelers', 'Wook', 'YouScribe'].map((platform) => (
                      <div key={platform} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Library Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Library Submission over 30K plus Libraries through:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Bakers & Taylor', 'Bibliotheca', 'OverDrive'].map((platform) => (
                      <div key={platform} className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                        <span className="text-gray-700 font-medium">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
                <button className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  Write a Review
                </button>
              </div>
            )}
          </div>

          {/* About Neurospicy Section - At Bottom */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">About Neurospicy</h3>
            <p className="text-gray-700 leading-relaxed mb-4 italic">
              "The rollercoaster of success and failure that had defined my journey was now compounded by the battles I fought every day—ADHD and dyslexia, lifelong companions that shaped my struggles in ways only a few understood."
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This book is more than a memoir; it's an unfiltered exploration to understand myself. When traditional lifelines—friends, family, even counselors—fell short, I had no choice but to turn inward. What began as a desperate search for answers became a transformative quest: to unravel the mysteries of my mind, to confront the stigma of neurodiversity, and to reclaim control over my life.
            </p>
          </div>
        </div>
        </div>
      </div>
      <Footer whiteBackground={true} />
    </div>
  )
}
