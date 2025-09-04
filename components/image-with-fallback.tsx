// components/image-with-fallback.tsx
"use client"

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  sizes,
  fallbackSrc = '/placeholder.jpg'
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  // Se não tem src válida, mostra placeholder direto
  if (!src || src.trim() === '') {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 text-sm ${className}`}>
        Sem imagem
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={handleError}
      unoptimized={true}
      priority={false}
    />
  )
}
