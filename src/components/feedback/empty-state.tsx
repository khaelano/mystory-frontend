import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

export function EmptyState({
  message,
  action,
  icon,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`bg-gray-50 border border-gray-200 rounded-lg p-8 text-center ${className}`}
    >
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="text-gray-500 mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
