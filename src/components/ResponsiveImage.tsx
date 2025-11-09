'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ResponsiveImageProps {
  src: string // Base path without -mobile or -desktop suffix
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
  fallback?: string // Optional fallback if mobile/desktop versions don't exist
  useResponsive?: boolean // Set to true only if mobile/desktop versions exist
}

/**
 * Hook to detect if device is mobile
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check on client side only
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    // Initial check
    checkMobile()

    // Listen for resize events
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Get the appropriate image path based on device type
 */
function getResponsiveImagePath(basePath: string, isMobile: boolean, fallback?: string): string {
  // Extract extension and base name
  const lastDot = basePath.lastIndexOf('.')
  const ext = basePath.substring(lastDot)
  const name = basePath.substring(0, lastDot)

  // Remove any existing -mobile or -desktop suffix
  const baseName = name.replace(/-mobile$|-desktop$/, '')

  // Try mobile/desktop version first
  const responsivePath = `${baseName}-${isMobile ? 'mobile' : 'desktop'}${ext}`
  
  // Return responsive path (browser will fall back to src if file doesn't exist)
  return responsivePath
}

/**
 * ResponsiveImage component that serves mobile or desktop images
 */
export default function ResponsiveImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className = '',
  priority = false,
  fallback,
  useResponsive = false, // Only use responsive if explicitly enabled
}: ResponsiveImageProps) {
  const isMobile = useIsMobile()
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which image to use
  let imagePath: string
  
  // Only try responsive versions if explicitly enabled
  if (useResponsive && mounted && !imageError) {
    // Try responsive version first
    imagePath = getResponsiveImagePath(src, isMobile)
  } else if (useResponsive && imageError && fallback) {
    // Use fallback if responsive version failed
    imagePath = fallback
  } else if (useResponsive && !mounted && fallback) {
    // Use fallback during SSR
    imagePath = fallback
  } else {
    // Use original src directly (no responsive versions)
    imagePath = src
  }

  const handleError = () => {
    if (!imageError && useResponsive && fallback) {
      setImageError(true)
    }
  }

  // Use fallback or original src if error occurred
  const finalSrc = (imageError && fallback) ? fallback : imagePath

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
    />
  )
}

