import { Badge } from './badge'

interface KeywordListProps {
  keywords: string[]
  maxVisible?: number
  variant?: 'default' | 'primary'
  className?: string
}

export function KeywordList({
  keywords,
  maxVisible = 2,
  variant = 'default',
  className = '',
}: KeywordListProps) {
  const visibleKeywords = keywords.slice(0, maxVisible)
  const remainingCount = keywords.length - maxVisible

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {visibleKeywords.map((keyword, idx) => (
        <Badge key={idx} variant={variant}>
          {keyword}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant={variant}>+{remainingCount}</Badge>
      )}
    </div>
  )
}
