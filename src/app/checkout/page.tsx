"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
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
    address: '',
    city: '',
    state_code: '',
    country_code: '',
    postcode: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const isPhysicalFormat = selectedFormat === 'paperback' || selectedFormat === 'hardcover'
  const { addToCart, items, updateQuantity } = useCart()
  const router = useRouter()
  const [availableShippingOptions, setAvailableShippingOptions] = useState<any[]>([])
  const [selectedShippingOption, setSelectedShippingOption] = useState<any>(null)
  const [isLoadingShipping, setIsLoadingShipping] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state_code: '',
    country_code: '',
    postcode: '',
  })

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
    return basePrice;
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
    const sku = selectedFormat === 'ebook' ? '3001' : selectedFormat === 'paperback' ? '1001' : '2001'
    const itemId = `${selectedFormat}-${sku}`

    // Check if item already exists in cart
    const existingItem = items.find(item => item.id === itemId)

    if (existingItem) {
      // Update quantity instead of adding to it
      updateQuantity(itemId, quantity)
    } else {
      // Add new item to cart
      addToCart({
        title: 'Neurospicy',
        format: selectedFormat,
        price: getPrice(),
        quantity: quantity,
        sku: sku
      })
    }

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


  // Lulu products
  const LULU_PRODUCTS: any = {
    paperback: {
      pod_package_id: "0600X0900BWSTDPB060UW444GXX",
      print_job_id: "7kj8zkn",
      price: 35.0,
      interior: {
        source_url: "https://neurospicy.life/lulu/7kj8zkn_interior.pdf",
        format: "PDF"
      },
      cover: {
        source_url: "https://neurospicy.life/lulu/7kj8zkn_cover.pdf",
        format: "PDF"
      }
    },
    hardcover: {
      pod_package_id: "0600X0900BWSTDCW060UW444GXX",
      print_job_id: "84jym4v",
      price: 40.0,
      interior: {
        source_url: "https://neurospicy.life/lulu/84jym4v_interior.pdf",
        format: "PDF"
      },
      cover: {
        source_url: "https://neurospicy.life/lulu/84jym4v_cover.pdf",
        format: "PDF"
      }
    },
  };


  const getToken = async () => {
    const response = await fetch('/.netlify/functions/get-lulu-token', {
      method: 'POST',
    })
    const data = await response.json()
    return data.token;
  }


  // ==================================================================
  // STEP 2: Add function to fetch available shipping options with prices
  // ==================================================================

  const fetchShippingOptions = useCallback(async () => {
    if (!isPhysicalFormat) return [];

    try {
      setIsLoadingShipping(true)
      const token = await getToken();
      const product = LULU_PRODUCTS[selectedFormat];

      // Build query parameters
      const params = {
        "currency": "USD",
        "line_items": [
          {
            "page_count": "105",
            "pod_package_id": product.pod_package_id,
            "quantity": quantity
          }
        ],
        "shipping_address": {
          "city": formData.city,
          "country": formData.country_code || "US",
          "postcode": formData.postcode,
          "state_code": formData.state_code,
          "street1": formData.address
        }
      }

      const response = await fetch(`https://api.lulu.com/shipping-options`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })

      const data = await response.json();

      if (response.ok && data && Array.isArray(data)) {
        // Sort by price (cheapest first)
        const sortedOptions = data.sort((a: any, b: any) => a.cost_excl_tax - b.cost_excl_tax);

        setAvailableShippingOptions(sortedOptions);

        // Set default to cheapest option (first in sorted array)
        if (sortedOptions.length > 0) {
          setSelectedShippingOption(sortedOptions[0]);
        }

        return sortedOptions;
      }

      return [];
    } catch (error) {
      console.error('Error fetching shipping options:', error);
      return [];
    } finally {
      setIsLoadingShipping(false)
    }
  }, [])

  // ==================================================================
  // STEP 4: Add useEffect to fetch shipping options when address is filled
  // ==================================================================

  useEffect(() => {
    // Only fetch when we have required address fields
    if (isPhysicalFormat &&
      formData.country_code &&
      formData.country_code.length === 2 &&
      showCheckoutForm) {
      fetchShippingOptions();
    }
  }, [
      isPhysicalFormat,
      formData.country_code,
      formData.state_code,
      formData.city,
      formData.address,
      formData.postcode,
      selectedFormat,
      quantity,
      showCheckoutForm
    ]);

  // ==================================================================
  // STEP 5: Add function to get shipping level icon and display name
  // ==================================================================

  const getShippingLevelInfo = (level: string) => {
    const levelMap: Record<string, { icon: string, displayName: string, badge: string }> = {
      'MAIL': { icon: '📦', displayName: 'Standard Mail', badge: 'Economical' },
      'GROUND': { icon: '🚚', displayName: 'Ground', badge: 'Standard' },
      'GROUND_HD': { icon: '🏠', displayName: 'Ground Home', badge: 'Standard' },
      'GROUND_BUS': { icon: '🏢', displayName: 'Ground Business', badge: 'Standard' },
      'PRIORITY_MAIL': { icon: '📮', displayName: 'Priority Mail', badge: 'Fast' },
      'EXPEDITED': { icon: '✈️', displayName: 'Expedited', badge: 'Fast' },
      'EXPRESS': { icon: '⚡', displayName: 'Express', badge: 'Fastest' },
    };

    return levelMap[level] || { icon: '📦', displayName: level, badge: '' };
  }

  // ==================================================================
  // STEP 6: Add function to format delivery date range
  // ==================================================================

  const formatDeliveryDate = (minDate: string, maxDate: string) => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  }

  // ==================================================================
  // STEP 7: Add function to calculate total with shipping
  // ==================================================================

  const getTotalWithShipping = () => {
    const itemTotal = getPrice() * quantity
    const shipping = selectedShippingOption?.cost_excl_tax || 0
    return isPhysicalFormat ? itemTotal + shipping : itemTotal
  }

  const validateLuluShipping = async () => {
    if (!isPhysicalFormat) return true;
    const product = LULU_PRODUCTS[selectedFormat];
    const token = await getToken();
    const payloadLulu = {
      "line_items": [
        {
          "pod_package_id": product.pod_package_id,
          "quantity": Number(quantity),
          "page_count": "105"
        }
      ],
      "contact_email": formData.email,
      "shipping_address": {
        "name": formData.name,
        "street1": formData.address,
        "city": formData.city,
        "state_code": formData.state_code,
        "country_code": formData.country_code,
        "postcode": formData.postcode,
        "phone_number": formData.phone
      },
      "shipping_level": selectedShippingOption?.level || "MAIL"
    }

    const responseLulu = await fetch('https://api.lulu.com/print-job-cost-calculations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payloadLulu)
    })

    const data = await responseLulu.json();
    const isValid = true;
    if (!responseLulu.ok) {
      // isValid = false
      // alert('Lulu API Error: ' + JSON.stringify(data, null, 2));

      // Parse Lulu API error structure
      let errorMessage = 'Shipping address validation failed:\n\n';

      // Check for shipping_address.detail.errors structure
      if (data.shipping_address?.detail?.errors && Array.isArray(data.shipping_address.detail.errors)) {
        const errorMessages = data.shipping_address.detail.errors.map((err: any) => {
          const field = err.path ? err.path.replace(/_/g, ' ').toUpperCase() : 'Unknown field';
          return `• ${field}: ${err.message || 'Invalid value'}`;
        }).join('\n');
        errorMessage += errorMessages;
      }
      // Check for top-level errors array
      else if (data.errors && Array.isArray(data.errors)) {
        const errorMessages = data.errors.map((err: any) => {
          if (err.message) return `• ${err.message}`;
          if (err.path) return `• ${err.path}: ${err.code || 'Invalid'}`;
          return `• ${JSON.stringify(err)}`;
        }).join('\n');
        errorMessage += errorMessages;
      }
      // Check for simple message
      else if (data.message) {
        errorMessage += `• ${data.message}`;
      }
      // Fallback
      else {
        errorMessage += '• Please check all shipping address fields are correct.\n';
        errorMessage += '• Country code must be 2-letter ISO code (e.g., US, GB, CA)\n';
        errorMessage += '• State code must be valid for the country';
      }

      setIsFormValid(false)
      setSubmitStatus('error')

      // Show formatted error
      alert(errorMessage);

      return false;
    }
    setIsFormValid(isValid)
    return isValid;
  }

  // Update validateForm to set specific errors
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state_code: '',
      country_code: '',
      postcode: '',
    }

    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!formData.email.includes('@')) errors.email = 'Invalid email'
    if (!formData.phone.trim()) errors.phone = 'Phone is required'

    if (isPhysicalFormat) {
      if (!formData.address.trim()) errors.address = 'Address is required'
      if (!formData.city.trim()) errors.city = 'City is required'
      if (!formData.state_code.trim()) errors.state_code = 'State code is required'
      if (!formData.country_code.trim()) errors.country_code = 'Country code is required'
      if (!formData.postcode.trim()) errors.postcode = 'Postcode is required'
    }

    setFieldErrors(errors)
    return Object.values(errors).every(error => error === '')
  }

  useEffect(() => {
    if (!isPhysicalFormat) {
      setIsFormValid(validateForm())
    } else {
      
      setIsFormValid(false)
    }
  }, [selectedFormat, isPhysicalFormat])

  const handlePaymentSuccess = async () => {
    // Submit form data to Netlify Forms
    const formSubmissionData = {
      'form-name': 'checkout',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      address: isPhysicalFormat ? formData.address : '',
      format: selectedFormat,
      quantity: quantity.toString(),
      price: getPrice().toFixed(2),
      discountCode: discountCode || '',
      paymentMethod: 'stripe',
      paymentStatus: 'completed',
    }

    const encoded = new URLSearchParams(formSubmissionData).toString()

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      })

      if (response.ok) {
        console.log('Form data submitted to Netlify Forms')
        if (isPhysicalFormat) {
          const product = LULU_PRODUCTS[selectedFormat];
          const token = await getToken();
          const payloadLulu = {
            "line_items": [
              {
                "print_job_id": product.print_job_id,
                "pod_package_id": product.pod_package_id,
                "title": "Neurospicy",
                "quantity": Number(quantity),
                "interior": {
                  "source_url": product.interior.source_url,
                  "format": product.interior.format
                },
                "cover": {
                  "source_url": product.cover.source_url,
                  "format": product.cover.format
                }
              }
            ],
            "contact_email": formData.email,
            "shipping_address": {
              "name": formData.name,
              "street1": formData.address,
              "city": formData.city,
              "state_code": formData.state_code,
              "country_code": formData.country_code,
              "postcode": formData.postcode,
              "phone_number": formData.phone
            },
            "shipping_level": selectedShippingOption?.level || "MAIL"
          }

          const responseLulu = await fetch('https://api.lulu.com/print-jobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payloadLulu)
          })

          const data = await responseLulu.json();
          if (!responseLulu.ok) {
            alert('Lulu API Error: ' + JSON.stringify(data, null, 2));
          } else {
            console.log('Print job created:', data);
          }
        }
      } else {
        console.error('Failed to submit form to Netlify Forms')
      }
    } catch (error) {
      console.error('Error submitting form to Netlify Forms:', error)
    }

    setSubmitStatus('success')
    setTimeout(() => {
      router.push('/payment-success')
      setShowCheckoutForm(false)
      setSubmitStatus('idle')
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    setSubmitStatus('error')
    console.error('Payment error:', error)
  }

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
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
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
          address: '',
          city: '',
          state_code: '',
          country_code: '',
          postcode: '',
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
                        {fieldErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                        )}
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
                        {fieldErrors.email && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                        )}
                      </div>

                      {/* Phone (Required) */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                        />
                        {fieldErrors.phone && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                        )}
                      </div>

                      {/* Address (Only for Paperback/Hardcover) */}
                      {isPhysicalFormat && (
                        <>
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
                            {fieldErrors.address && (
                              <p className="text-red-500 text-sm mt-1">{fieldErrors.address}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <input type="text"
                              name='city'
                              id="city"
                              required
                              value={formData.city}
                              onChange={handleFormChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                            />
                            {fieldErrors.city && (
                              <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="state_code" className="block text-sm font-medium text-gray-700 mb-2">
                              State Code *
                            </label>
                            <input type="text"
                              name='state_code'
                              id="state_code"
                              required
                              value={formData.state_code}
                              onChange={handleFormChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                            />
                            {fieldErrors.state_code && (
                              <p className="text-red-500 text-sm mt-1">{fieldErrors.state_code}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="country_code" className="block text-sm font-medium text-gray-700 mb-2">
                              Country Code *
                            </label>
                            <input type="text"
                              name='country_code'
                              id="country_code"
                              required
                              value={formData.country_code}
                              onChange={handleFormChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                            />
                            {fieldErrors.country_code && (
                              <p className="text-red-500 text-sm mt-1">{fieldErrors.country_code}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-2">
                              Postcode *
                            </label>
                            <input type="text"
                              name='postcode'
                              id="postcode"
                              required
                              value={formData.postcode}
                              onChange={handleFormChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-gray-900 bg-white"
                            />
                            {fieldErrors.postcode && (
                              <p className="text-red-500 text-sm mt-1">{fieldErrors.postcode}</p>
                            )}
                          </div>
                        </>
                      )}

                      {/*  */}
                      {isPhysicalFormat && formData.country_code && formData.country_code.length === 2 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Shipping Method
                            {availableShippingOptions.length > 0 && (
                              <span className="text-sm font-normal text-gray-500 ml-2">
                                ({availableShippingOptions.length} options available)
                              </span>
                            )}
                          </h3>

                          {isLoadingShipping ? (
                            <div className="text-center py-8">
                              <div className="inline-flex items-center gap-2 text-gray-600">
                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading shipping options...
                              </div>
                            </div>
                          ) : availableShippingOptions.length > 0 ? (
                            <div className="space-y-3">
                              {availableShippingOptions.map((option) => {
                                const levelInfo = getShippingLevelInfo(option.level);
                                const isSelected = selectedShippingOption?.id === option.id;

                                return (
                                  <label
                                    key={option.id}
                                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                                        ? 'border-orange-500 bg-orange-50 shadow-md'
                                        : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="shipping"
                                      value={option.id}
                                      checked={isSelected}
                                      onChange={() => setSelectedShippingOption(option)}
                                      className="w-4 h-4 text-orange-600 mt-1"
                                    />
                                    <div className="ml-3 flex-1">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-start gap-2 flex-1">
                                          <span className="text-2xl">{levelInfo.icon}</span>
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <span className="font-semibold text-gray-800">
                                                {option.carrier_service_name}
                                              </span>
                                              {levelInfo.badge && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelInfo.badge === 'Fastest' ? 'bg-purple-100 text-purple-700' :
                                                    levelInfo.badge === 'Fast' ? 'bg-blue-100 text-blue-700' :
                                                      levelInfo.badge === 'Standard' ? 'bg-gray-100 text-gray-700' :
                                                        'bg-green-100 text-green-700'
                                                  }`}>
                                                  {levelInfo.badge}
                                                </span>
                                              )}
                                            </div>

                                            <div className="text-sm text-gray-600 mt-1 space-y-1">
                                              <div className="flex items-center gap-1">
                                                <span>⏱️ Transit: {option.transit_time} business {option.transit_time === 1 ? 'day' : 'days'}</span>
                                              </div>

                                              {option.min_delivery_date && option.max_delivery_date && (
                                                <div className="flex items-center gap-1">
                                                  <span>📅 Delivery: {formatDeliveryDate(option.min_delivery_date, option.max_delivery_date)}</span>
                                                </div>
                                              )}

                                              {/* <div className="flex items-center gap-2 flex-wrap">
                                                {option.traceable && (
                                                  <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                                                    ✓ Trackable
                                                  </span>
                                                )}
                                                {option.postbox_ok && (
                                                  <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                                                    📮 P.O. Box OK
                                                  </span>
                                                )}
                                                {option.home_only && (
                                                  <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-2 py-0.5 rounded">
                                                    🏠 Home Only
                                                  </span>
                                                )}
                                                {option.business_only && (
                                                  <span className="inline-flex items-center gap-1 text-xs bg-gray-50 text-gray-700 px-2 py-0.5 rounded">
                                                    🏢 Business Only
                                                  </span>
                                                )}
                                              </div> */}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="text-right ml-4">
                                          <div className={`text-lg font-bold ${isSelected ? 'text-orange-600' : 'text-gray-800'
                                            }`}>
                                            ${option.cost_excl_tax.toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {option.currency}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                              <p className="text-gray-600 mb-2">No shipping options available yet</p>
                              <p className="text-sm text-gray-500">
                                Complete the country code field to see available shipping options
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Continue to Payment Button */}
                      {!isFormValid && (
                        <div className="pt-4">
                          <button
                            type="button"
                            // onClick={async () => {
                            //   if (validateForm() && await validateLuluShipping()) {
                            //     setIsFormValid(true)
                            //   } else {
                            //     setSubmitStatus('error')
                            //   }
                            // }}
                            onClick={async () => {
                              const formValid = validateForm()
                              if (!formValid) {
                                setSubmitStatus('error')
                                return
                              }

                              const addressValid = await validateLuluShipping()
                              if (addressValid) {
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
                              <span className="text-lg font-semibold text-gray-800">SubTotal:</span>
                              <span className="text-lg font-bold text-orange-600">${(getPrice() * quantity).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                              <span className="text-lg font-semibold text-gray-800">Shipping:</span>
                              <span className="text-lg font-bold text-orange-600">${(selectedShippingOption?.cost_excl_tax || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                              <span className="text-lg font-semibold text-gray-800">Total:</span>
                              <span className="text-lg font-bold text-orange-600">${(getPrice() * quantity + (selectedShippingOption?.cost_excl_tax || 0)).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                        <StripeCheckout
                          amount={getTotalWithShipping()}
                          format={selectedFormat}
                          quantity={quantity}
                          discountCode={discountCode}
                          customerEmail={formData.email}
                          shippingInfo={{
                            cost: selectedShippingOption?.cost_excl_tax || 0,
                            level: selectedShippingOption?.level || '',
                            carrier: selectedShippingOption?.carrier_service_name || ''
                          }}
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

                    {/* Phone (Required) */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
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
                        className={`w-full bg-gradient-to-r from-orange-500/90 to-red-500/90 hover:from-orange-600/90 hover:to-red-600/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
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
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l-2.541 4.666c-.49-.245-1.196-.566-1.91-.866l1.087-2.604c-.363-.134-.758-.263-1.071-.363zm-1.432 5.762c-2.341.735-4.005 1.705-4.005 2.935 0 .988.834 1.692 2.11 1.692 2.877 0 5.298-1.402 6.965-2.343l-2.54-4.62c-.57.205-1.2.414-1.824.616l1.294 2.92zm-11.544-4.812c0 2.084 1.507 3.874 3.554 4.724l2.862-6.848c-1.314-1.032-2.158-2.293-2.158-3.94 0-2.98 2.476-5.146 6.003-5.146.281 0 .553.019.813.052v6.22h-3.495c-1.372 0-2.077.701-2.077 1.8 0 1.459 1.161 2.117 2.867 2.898l4.162-9.848c.579-.226 1.19-.413 1.822-.568-.747-.28-1.558-.43-2.411-.43-5.048 0-8.728 3.108-8.728 7.358z" />
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
                  className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${activeTab === 'distribution'
                      ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                      : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                    }`}
                >
                  Distribution
                </button>
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${activeTab === 'description'
                      ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                      : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                    }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('additional')}
                  className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${activeTab === 'additional'
                      ? 'border-orange-500/70 text-orange-600/90 bg-orange-50/50'
                      : 'border-transparent text-gray-500 hover:text-orange-500/70 hover:border-orange-300/50'
                    }`}
                >
                  Additional Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer hover:bg-gray-50 hover:scale-105 whitespace-nowrap ${activeTab === 'reviews'
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
