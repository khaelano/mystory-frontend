import type { ReactNode } from 'react'

type PageSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface PageContainerProps {
  children: ReactNode
  size?: PageSize
  className?: string
}

const sizeStyles: Record<PageSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export function PageContainer({
  children,
  size = 'lg',
  className = '',
}: PageContainerProps) {
  return (
    <div className={`${sizeStyles[size]} mx-auto p-6 ${className}`}>
      {children}
    </div>
  )
}
