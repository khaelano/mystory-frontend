import { useEffect } from 'react'

interface UseUnsavedChangesOptions {
  isDirty: boolean
  isSubmitting?: boolean
  message?: string
}

export function useUnsavedChanges({
  isDirty,
  isSubmitting = false,
  message = 'You have unsaved changes. Are you sure you want to leave?',
}: UseUnsavedChangesOptions) {
  // Browser beforeunload warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, isSubmitting])

  // Confirmation function for programmatic navigation
  const confirmNavigation = (): boolean => {
    if (!isDirty) return true
    return window.confirm(message)
  }

  return { confirmNavigation }
}
