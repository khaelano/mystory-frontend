import type { ReactNode } from 'react'

type AlertVariant = 'error' | 'success' | 'warning' | 'info'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  className?: string
}

const variantStyles: Record<AlertVariant, { container: string; title: string }> = {
  error: {
    container: 'bg-red-100 border-red-400 text-red-700',
    title: 'text-red-900',
  },
  success: {
    container: 'bg-green-100 border-green-400 text-green-700',
    title: 'text-green-900',
  },
  warning: {
    container: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    title: 'text-yellow-900',
  },
  info: {
    container: 'bg-blue-100 border-blue-400 text-blue-700',
    title: 'text-blue-900',
  },
}

export function Alert({
  variant = 'info',
  title,
  children,
  className = '',
}: AlertProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={`border px-4 py-3 rounded ${styles.container} ${className}`}
      role="alert"
    >
      {title && (
        <p className={`font-bold mb-1 ${styles.title}`}>{title}</p>
      )}
      <div>{children}</div>
    </div>
  )
}
