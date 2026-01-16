import { useState, useEffect } from 'react'
import { TextInput } from '../inputs/text-input'
import { TextArea } from '../inputs/text-area'
import { Button } from '../button'

interface ChapterEditorProps {
  initialTitle?: string
  initialContent?: string
  onSave: (chapter: { title: string; content: string }) => void
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
  cancelLabel?: string
}

export function ChapterEditor({
  initialTitle = '',
  initialContent = '',
  onSave,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save Chapter',
  cancelLabel = 'Cancel',
}: ChapterEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Track dirty state
  useEffect(() => {
    const hasChanges = title !== initialTitle || content !== initialContent
    setIsDirty(hasChanges)
  }, [title, content, initialTitle, initialContent])

  // Warn on unsaved changes
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

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Please enter a chapter title')
      return
    }
    if (!content.trim()) {
      setError('Please enter chapter content')
      return
    }

    setError(null)
    onSave({ title: title.trim(), content: content.trim() })
  }

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return
    }
    onCancel()
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* Title Input */}
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chapter title"
          required
          disabled={isSubmitting}
        />

        {/* Content */}
        <TextArea
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your chapter content here..."
          rows={12}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
