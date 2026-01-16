import { Button } from '../button'

interface FormFooterProps {
  onCancel: () => void
  onSubmit: () => void
  cancelLabel?: string
  submitLabel?: string
  isSubmitting?: boolean
  submitDisabled?: boolean
  className?: string
}

export function FormFooter({
  onCancel,
  onSubmit,
  cancelLabel = 'Cancel',
  submitLabel = 'Save',
  isSubmitting = false,
  submitDisabled = false,
  className = 'flex justify-end gap-4 pt-4',
}: FormFooterProps) {
  return (
    <div className={className}>
      <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
        {cancelLabel}
      </Button>
      <Button
        variant="primary"
        onClick={onSubmit}
        isLoading={isSubmitting}
        disabled={submitDisabled}
      >
        {submitLabel}
      </Button>
    </div>
  )
}
