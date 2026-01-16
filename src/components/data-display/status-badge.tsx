import type { StoryStatus } from '../../api/schema'

interface StatusBadgeProps {
  status: StoryStatus
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const isPublished = status === 'PUBLISHED'

  return (
    <span
      className={`inline-block px-3 py-1 text-xs rounded-full ${
        isPublished
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      } ${className}`}
    >
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}
