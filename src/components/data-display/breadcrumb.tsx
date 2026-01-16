import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  className?: string
}

export function Breadcrumb({
  items,
  separator = '/',
  className = '',
}: BreadcrumbProps) {
  return (
    <nav className={`mb-6 ${className}`}>
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to as any} className="hover:text-orange-500">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? 'text-gray-900 font-medium' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-gray-400">{separator}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
