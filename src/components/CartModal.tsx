"use client"

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [discountCode, setDiscountCode] = useState('')
  const [isDiscountApplied, setIsDiscountApplied] = useState(false)

  if (!isOpen) return null

  const handleCheckout = () => {
    onClose()
    // Small delay to ensure modal closes before navigation
    setTimeout(() => {
      router.push('/checkout')
    }, 100)
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  // Calculate price with discount
  const getDiscountedPrice = () => {
    const baseTotal = getTotalPrice()
    if (isDiscountApplied && discountCode === 'ABC25') {
      return baseTotal * 0.85 // 15% off
    }
    return baseTotal
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

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden mx-2 sm:mx-0">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-80 sm:max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Neurospicy</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{item.format}</p>
                    <p className="text-xs sm:text-sm text-gray-500">SKU: #{item.sku}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 hover:scale-110 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base"
                      >
                        -
                      </button>
                      <span className="w-6 sm:w-8 text-center font-medium text-gray-800 text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 hover:scale-110 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{formatPrice(item.price)} each</p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 sm:p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 sm:p-6">
            {/* Discount Code and Total on same line */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Discount Code Section */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={handleDiscountCodeChange}
                    placeholder="Enter discount code"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/70 text-black uppercase text-sm sm:text-base"
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

              {/* Total Price */}
              <div className="flex-1 sm:flex-none sm:items-end sm:justify-end flex flex-col">
                {isDiscountApplied && (
                  <div className="flex items-center gap-2 mb-2 sm:justify-end">
                    <span className="text-base text-gray-500 line-through">{formatPrice(getTotalPrice())}</span>
                    <span className="bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-2 py-1 rounded">15% OFF</span>
                  </div>
                )}
                <div className="flex justify-between sm:justify-end items-center gap-2 sm:gap-4">
                  <span className="text-base sm:text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-xl sm:text-2xl font-bold text-orange-600">{formatPrice(getDiscountedPrice())}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={clearCart}
                className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 hover:scale-105 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full sm:flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 cursor-pointer text-sm sm:text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
