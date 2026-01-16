import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useDraftStory } from '../../../context/draft-story'
import { createStory } from '../../../api/handler/story'
import { TextInput } from '../../../components/inputs/text-input'
import { TextArea } from '../../../components/inputs/text-area'
import { Button } from '../../../components/button'

export const Route = createFileRoute('/stories/create/new-chapter')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { draft, addChapter, clearDraft } = useDraftStory()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!draft) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: Story details not found. Please go back and fill in story details first.
        </div>
        <Button
          variant="primary"
          onClick={() => navigate({ to: '/stories/create' })}
          className="mt-4"
        >
          Back to Story Details
        </Button>
      </div>
    )
  }

  const handleAddChapter = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in chapter title and content')
      return
    }

    addChapter({ title: title.trim(), content: content.trim() })
    setTitle('')
    setContent('')
    setError(null)
  }

  const handleSaveStory = async () => {
    if (draft.chapters.length === 0) {
      setError('Please add at least one chapter before saving')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await createStory({
        title: draft.title,
        authorName: draft.authorName,
        synopsis: draft.synopsis,
        category: draft.category,
        keywords: draft.keywords,
        coverUrl: draft.coverUrl,
        chapters: draft.chapters,
      })

      clearDraft()
      navigate({ to: '/stories' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save story. Please try again.')
      console.error('Failed to create story:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="text-gray-400">Stories Management</span>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-gray-400">Add Stories</span>
        <span className="mx-2 text-gray-400">&gt;</span>
        <span className="text-orange-500">Add Chapter</span>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Add Chapter</h1>

      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: '/stories/create' })}
          leftIcon={<span>←</span>}
        >
          Back
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
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
          placeholder="Title"
          required
        />

        {/* Story Content */}
        <TextArea
          label="Story"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your chapter content here..."
          rows={12}
          required
        />

        {/* Add Chapter Button */}
        <Button
          variant="secondary"
          onClick={handleAddChapter}
          className="w-full"
          leftIcon={<span>+</span>}
          disabled={isSubmitting}
        >
          Add Chapter to List
        </Button>
      </div>

      {/* Chapters List */}
      {draft.chapters.length > 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Added Chapters ({draft.chapters.length})
          </h2>
          <div className="space-y-2">
            {draft.chapters.map((chapter, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <p className="font-medium text-gray-900">
                  Chapter {index + 1}: {chapter.title}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {chapter.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          variant="outline"
          onClick={() => navigate({ to: '/stories/create' })}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveStory}
          isLoading={isSubmitting}
          disabled={draft.chapters.length === 0}
        >
          Save Story to Backend
        </Button>
      </div>
    </div>
  )
}