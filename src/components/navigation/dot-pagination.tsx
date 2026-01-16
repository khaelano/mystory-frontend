import { Button } from '../button'

interface DotPaginationProps {
  total: number
  current: number
  onNavigate: (index: number) => void
  onPrevious?: () => void
  onNext?: () => void
  showButtons?: boolean
  className?: string
}

export function DotPagination({
  total,
  current,
  onNavigate,
  onPrevious,
  onNext,
  showButtons = true,
  className = '',
}: DotPaginationProps) {
  const hasPrevious = current > 0
  const hasNext = current < total - 1

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {showButtons && onPrevious ? (
        <Button
          variant="ghost"
          size="sm"
          disabled={!hasPrevious}
          onClick={onPrevious}
        >
          ← Previous
        </Button>
      ) : (
        <div />
      )}

      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === current
                ? 'bg-orange-500'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to item ${idx + 1}`}
          />
        ))}
      </div>

      {showButtons && onNext ? (
        <Button variant="ghost" size="sm" disabled={!hasNext} onClick={onNext}>
          Next →
        </Button>
      ) : (
        <div />
      )}
    </div>
  )
}
