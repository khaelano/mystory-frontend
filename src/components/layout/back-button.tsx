import { useNavigate } from '@tanstack/react-router'
import { Button } from '../button'

interface BackButtonProps {
  onClick?: () => void
  to?: string
  label?: string
  className?: string
}

export function BackButton({
  onClick,
  to,
  label = 'Back',
  className = 'mb-6',
}: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (to) {
      navigate({ to: to as any })
    } else {
      navigate({ to: '..' })
    }
  }

  return (
    <div className={className}>
      <Button
        variant="ghost"
        onClick={handleClick}
        leftIcon={<span>←</span>}
      >
        {label}
      </Button>
    </div>
  )
}
