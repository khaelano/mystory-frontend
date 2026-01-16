import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

interface CardSectionProps {
  children: ReactNode
  className?: string
}

function CardRoot({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

function CardBody({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`px-6 py-6 ${className}`}>
      {children}
    </div>
  )
}

function CardFooter({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
