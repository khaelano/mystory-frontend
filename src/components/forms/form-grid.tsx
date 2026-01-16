import type { ReactNode } from 'react'

interface FormGridProps {
  children: ReactNode
  columns?: 1 | 2
  className?: string
}

export function FormGrid({ children, columns = 2, className = '' }: FormGridProps) {
  const gridClass = columns === 2 ? 'grid grid-cols-2 gap-4' : 'space-y-4'
  return <div className={`${gridClass} ${className}`}>{children}</div>
}
