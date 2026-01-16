import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface ModalSectionProps {
  children: ReactNode
  className?: string
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

function ModalRoot({
  children,
  isOpen,
  onClose,
  size = 'md',
  className = '',
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg ${sizeStyles[size]} w-full mx-4 shadow-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function ModalHeader({ children, className = '' }: ModalSectionProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

function ModalBody({ children, className = '' }: ModalSectionProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

function ModalFooter({ children, className = '' }: ModalSectionProps) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
})
