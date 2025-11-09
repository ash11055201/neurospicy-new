"use client"

import { useCart } from '@/contexts/CartContext'

interface CartIconProps {
  onClick: () => void
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <button
      onClick={onClick}
      className="text-gray-800 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer relative inline-flex items-center"
      aria-label={`Shopping cart${totalItems > 0 ? ` with ${totalItems} item${totalItems > 1 ? 's' : ''}` : ''}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}
