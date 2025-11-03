"use client"

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReviewSection from '@/components/ReviewSection'
import { useCart } from '@/contexts/CartContext'
import StripeCheckout from '@/components/StripeCheckout'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const [selectedFormat, setSelectedFormat] = useState('ebook')
  const [quantity, setQuantity] = useState(1)
  const [quantityInput, setQuantityInput] = useState('1')
  const [activeTab, setActiveTab] = useState('distribution')
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const { addToCart } = useCart()
  const router = useRouter()

  const coverImages = [
    {
      src: '/neurospicy book cover.jpg',
      alt: 'Neurospicy Book Cover',
      title: 'Book Cover'
    },
    {
      src: '/neurospicy back cover.jpg',
      alt: 'Neurospicy Back Cover',
      title: 'Back Cover'
    }
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === coverImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? coverImages.length - 1 : prevIndex - 1
    )
  }

  const pricing = {
    ebook: 29.99,
    paperback: 35.00,
    hardcover: 40.00
  }

  // Calculate price with discount
  const getPrice = () => {
    const basePrice = pricing[selectedFormat as keyof typeof pricing]
    if (isDiscountApplied && discountCode === 'ABC25') {
      return basePrice * 0.85 // 15% off
    }
    return basePrice
  }

  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase()
    setDiscountCode(code)
    if (code === 'ABC25') {
      setIsDiscountApplied(true)
    } else {
      setIsDiscountApplied(false)
    }
  }


  const handleStripeCheckout = () => {
    addToCart({
      title: 'Neurospicy',
      format: selectedFormat,
      price: getPrice(),
      quantity: quantity,
      sku: selectedFormat === 'ebook' ? '3001' : selectedFormat === 'paperback' ? '1001' : '2001'
    })
    setPaymentMethod('stripe')
    setShowCheckoutForm(true)
    // Reset form validation when opening
    setIsFormValid(false)
  }

  const handleAddToCart = () => {
    const sku = selectedFormat === 'ebook' ? '3001' : selectedFormat === 'paperback' ? '1001' : '2001'
    addToCart({
      title: 'Neurospicy',
      format: selectedFormat,
      price: getPrice(),
      quantity: quantity,
      sku: sku
    })
    
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  // Validate form whenever form data changes
  const validateForm = () => {
    const hasName = formData.name.trim().length > 0
    const hasEmail = formData.email.trim().length > 0 && formData.email.includes('@')
    const hasAddress = !isPhysicalFormat || formData.address.trim().length > 0
    
    const isValid = hasName && hasEmail && hasAddress
    setIsFormValid(isValid)
    return isValid
  }

  const handlePaymentSuccess = () => {
    setSubmitStatus('success')
    setTimeout(() => {
      router.push('/story-success')
      setShowCheckoutForm(false)
      setSubmitStatus('idle')
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    setSubmitStatus('error')
    console.error('Payment error:', error)
  }

  const isPhysicalFormat = selectedFormat === 'paperback' || selectedFormat === 'hardcover'

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Validate after a short delay to avoid excessive validation
    setTimeout(() => validateForm(), 100)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      setSubmitStatus('error')
      return
    }

    // For physical formats, address is required
    if (isPhysicalFormat && !formData.address.trim()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formSubmissionData = {
      'form-name': 'checkout',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      address: isPhysicalFormat ? formData.address : '',
      format: selectedFormat,
      quantity: quantity.toString(),
      price: getPrice().toString(),
      discountCode: discountCode || ''
    }

    const encoded = new URLSearchParams(formSubmissionData).toString()

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: ''
        })
        setTimeout(() => {
          setShowCheckoutForm(false)
          setSubmitStatus('idle')
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 py-12">
        {/* Checkout Form Modal */}
        {showCheckoutForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Complete Your Order</h2>
                  <button
                    onClick={() => {
                      setShowCheckoutForm(false)
                      setSubmitStatus('idle')
                      setPaymentMethod(null)
                      setIsFormValid(false)
                    }}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-all duration-200 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6 transition-transform duration-200 hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-medium">
                        Thank you for your order! We&apos;ll be in touch soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <p className="text-red-800 font-medium">
                        There was an error submitting your order. Please try again.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form must be filled first when Stripe payment is selected */}
                {paymentMethod === 'stripe' && (
                  <>
                    <form
                      name="checkout"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      className="space-y-4"
                    >
                      <input type="hidden" name="form-name" value="checkout" />
                      <input type="hidden" name="bot-field" />

                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                        />
                      </div>

                      {/* Phone (Optional) */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                        />
                      </div>

                      {/* Address (Only for Paperback/Hardcover) */}
                      {isPhysicalFormat && (
                        <div>
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Address *
                          </label>
                          <textarea
                            id="address"
                            name="address"
                            required
                            rows={3}
                            value={formData.address}
                            onChange={(e) => {
                              setFormData({ ...formData, address: e.target.value })
                              setTimeout(() => validateForm(), 100)
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                            placeholder="Enter your shipping address"
                          />
                        </div>
                      )}

                      {/* Continue to Payment Button */}
                      {!isFormValid && (
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              if (validateForm()) {
                                setIsFormValid(true)
                              } else {
                                setSubmitStatus('error')
                              }
                            }}
                            className="w-full bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          >
                            Continue to Payment
                          </button>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            Please fill in all required fields to continue
                          </p>
                        </div>
                      )}
                    </form>

                    {/* Show Stripe Payment only after form is validated */}
                    {isFormValid && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Format:</span>
                              <span className="font-medium text-gray-800 capitalize">{selectedFormat}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Quantity:</span>
                              <span className="font-medium text-gray-800">{quantity}</span>
                            </div>
                            {isDiscountApplied && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Discount:</span>
                                <span className="font-medium text-green-600">15% OFF</span>
                              </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                              <span className="text-lg font-semibold text-gray-800">Total:</span>
                              <span className="text-lg font-bold text-orange-600">${(getPrice() * quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <StripeCheckout
                          amount={getPrice() * quantity}
                          format={selectedFormat}
                          quantity={quantity}
                          discountCode={discountCode}
                          customerEmail={formData.email}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                        />
                      </div>
                    )}
                  </>
                )}
                
                {/* Fallback form (should not be shown, but keeping for safety) */}
                {!paymentMethod && (
                  <form
                  name="checkout"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="checkout" />
                  <input type="hidden" name="bot-field" />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                    />
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                    />
                  </div>

                  {/* Address (Only for Paperback/Hardcover) */}
                  {isPhysicalFormat && (
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                        placeholder="Enter your shipping address"
                      />
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </div>
                      ) : (
                        'Submit Order'
                      )}
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Book Covers */}
            <div className="flex justify-center lg:justify-start items-start">
              <div className="relative w-full">
                {/* Main Carousel */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-2">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {coverImages.map((image, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="relative w-full aspect-[4/5]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-contain rounded-lg"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 group cursor-pointer"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 group-hover:text-orange-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-10 group cursor-pointer"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 group-hover:text-orange-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info & Purchase */}
            <div>
            {/* Category */}
            <div className="text-sm text-gray-500 mb-2">Books</div>
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Neurospicy by John O&apos;Shea</h2>
            
            {/* Price */}
            <div className="mb-4">
              {isDiscountApplied && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg text-gray-500 line-through">${pricing[selectedFormat as keyof typeof pricing].toFixed(2)}</span>
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded">15% OFF</span>
                </div>
              )}
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                ${getPrice().toFixed(2)}
              </div>
            </div>

            {/* Format and Quantity on same line */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Format Selection */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-black"
                >
                  <option value="ebook">eBook - $29.99</option>
                  <option value="paperback">Paperback - $35.00</option>
                  <option value="hardcover">Hardcover - $40.00</option>
                </select>
              </div>

              {/* Quantity */}
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-black"
                />
              </div>
            </div>

            {/* Discount Code and Add to Cart on same line */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Discount Code */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      placeholder="Enter discount code"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-black uppercase"
                    />
                    {isDiscountApplied && (
                      <div className="flex items-center text-green-600 font-semibold px-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {discountCode && !isDiscountApplied && (
                    <p className="text-red-500 text-sm mt-1">Invalid discount code</p>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="flex-1 sm:flex-none sm:self-end relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2 sm:hidden">Add to Cart</label>
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer text-sm sm:text-base"
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
            </div>

            {/* Payment Options */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleStripeCheckout}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l-2.541 4.666c-.49-.245-1.196-.566-1.91-.866l1.087-2.604c-.363-.134-.758-.263-1.071-.363zm-1.432 5.762c-2.341.735-4.005 1.705-4.005 2.935 0 .988.834 1.692 2.11 1.692 2.877 0 5.298-1.402 6.965-2.343l-2.54-4.62c-.57.205-1.2.414-1.824.616l1.294 2.92zm-11.544-4.812c0 2.084 1.507 3.874 3.554 4.724l2.862-6.848c-1.314-1.032-2.158-2.293-2.158-3.94 0-2.98 2.476-5.146 6.003-5.146.281 0 .553.019.813.052v6.22h-3.495c-1.372 0-2.077.701-2.077 1.8 0 1.459 1.161 2.117 2.867 2.898l4.162-9.848c.579-.226 1.19-.413 1.822-.568-.747-.28-1.558-.43-2.411-.43-5.048 0-8.728 3.108-8.728 7.358z"/>
                </svg>
                <span>Pay with Stripe</span>
              </button>
            </div>

           
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto space-x-2 px-4 sm:px-6 scrollbar-hide">
              <button
                onClick={() => setActiveTab('distribution')}
                className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${
                  activeTab === 'distribution'
                    ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                    : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                    : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${
                  activeTab === 'additional'
                    ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                    : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                }`}
              >
                Additional Info
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                    : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                }`}
              >
                Reviews (0)
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Item Weight:</span>
                    <span className="ml-2 text-gray-600">350 grams</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">5.5&ldquo; x 8.5&rdquo;</span>
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {['Amazon', 'B&N', 'Kobo', 'iBooks', 'Scribd', 'Tolino', 'Walmart', 'Target', 'Chapter'].map((platform) => (
                      <div key={platform} className="bg-orange-50 border border-orange-200 rounded-lg p-2 sm:p-3 text-center">
                        <span className="text-gray-700 font-medium text-xs sm:text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paperback Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Paperback:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {['Adlibris', 'Agapea', 'Amazon.co.uk', 'Aphrohead', 'Blackwell', 'Book Depository Ltd', 'Books Express', 'Coutts Information Services Ltd', 'Designarta Books', 'Eden Interactive Ltd', 'Foyles', 'Gardners', 'Trust Media Distribution (formerly STL)', 'Mallory International', 'Paperback Shop Ltd', 'Superbookdeals', 'The Book Community Ltd', 'Waterstones', 'Wrap Distribution'].map((platform) => (
                      <div key={platform} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ebook Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Ebook:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                    {['24Symbols', 'Ainosco', 'Amazon*', 'Apple**', 'Barnes & Noble Nook', 'Bibliotheca', 'BibliU', 'Bolinda', 'Bookmate', 'Chegg', 'De Marque', 'eBooks.com', 'EBSCO', 'fable', 'Follett/B&T', 'Gardners', 'Glose', 'hoopla', 'Hummingbird', 'iGroup', 'ITSI', 'Kobo Plus', 'Kortex', 'Libreka', 'Libri.de', 'LitRes', 'Mackin', 'Odilo', 'OverDrive', 'Perlego', 'Perusall', 'ProQuest', 'Publica.la', 'RedShelf', 'Scribd', 'SpoonRead', 'Storytel', 'VitalSource', 'WF Howes', 'Wheelers', 'Wook', 'YouScribe'].map((platform) => (
                      <div key={platform} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Library Submission */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Library:</h4>
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
              <div className="py-2">
                <ReviewSection />
              </div>
            )}
          </div>

          {/* About Neurospicy Section - At Bottom */}
          <div className="p-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">About Neurospicy</h3>
            <p className="text-gray-700 leading-relaxed mb-4 italic">
              &ldquo;The rollercoaster of success and failure that had defined my journey was now compounded by the battles I fought every day—ADHD and dyslexia, lifelong companions that shaped my struggles in ways only a few understood.&rdquo;
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This book is more than a memoir; it&apos;s an unfiltered exploration to understand myself. When traditional lifelines—friends, family, even counselors—fell short, I had no choice but to turn inward. What began as a desperate search for answers became a transformative quest: to unravel the mysteries of my mind, to confront the stigma of neurodiversity, and to reclaim control over my life.
            </p>
          </div>
        </div>
        </div>
      </div>
      <Footer whiteBackground={true} />
    </div>
  )
}
