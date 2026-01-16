import { Button } from '../button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  className = '',
}: PaginationProps) {
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPrevious || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </Button>
      <span className="text-sm text-gray-600">
        {currentPage} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasNext || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </Button>
    </div>
  )
}
