import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getStoryById, updateStory } from '../../../api/handler/story'
import { StoryMetadataForm } from '../../../components/forms/story-metadata-form'
import { Button } from '../../../components/button'
import type { StoryCategory, StoryStatus } from '../../../api/schema'

export const Route = createFileRoute('/stories/$storyId/edit')({
  component: RouteComponent,
  loader: ({ params }) => getStoryById(params.storyId),
})

function RouteComponent() {
  const story = Route.useLoaderData()
  const navigate = useNavigate()
  const { storyId } = Route.useParams()

  // Form state initialized from loaded story
  const [title, setTitle] = useState(story.title)
  const [authorName, setAuthorName] = useState(story.authorName)
  const [synopsis, setSynopsis] = useState(story.synopsis)
  const [category, setCategory] = useState<StoryCategory>(story.category)
  const [keywords, setKeywords] = useState<string[]>(story.keywords)
  const [coverUrl, setCoverUrl] = useState(story.coverUrl ?? '')
  const [status, setStatus] = useState<StoryStatus>(story.status)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  // Track dirty state
  useEffect(() => {
    const hasChanges =
      title !== story.title ||
      authorName !== story.authorName ||
      synopsis !== story.synopsis ||
      category !== story.category ||
      JSON.stringify(keywords) !== JSON.stringify(story.keywords) ||
      coverUrl !== (story.coverUrl ?? '') ||
      status !== story.status

    setIsDirty(hasChanges)
  }, [title, authorName, synopsis, category, keywords, coverUrl, status, story])

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const handleSave = async () => {
    if (!title.trim() || !authorName.trim() || !synopsis.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await updateStory(storyId, {
        title: title.trim(),
        category,
        synopsis: synopsis.trim(),
        keywords,
        status,
        coverUrl: coverUrl || undefined,
      })

      setIsDirty(false)
      navigate({ to: '/stories/$storyId', params: { storyId } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update story')
      console.error('Failed to update story:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      return
    }
    navigate({ to: '/stories/$storyId', params: { storyId } })
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
          leftIcon={<span>←</span>}
        >
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Story</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <StoryMetadataForm
          title={title}
          authorName={authorName}
          synopsis={synopsis}
          category={category}
          keywords={keywords}
          coverUrl={coverUrl}
          status={status}
          onTitleChange={setTitle}
          onAuthorNameChange={setAuthorName}
          onSynopsisChange={setSynopsis}
          onCategoryChange={setCategory}
          onKeywordsChange={setKeywords}
          onCoverUrlChange={setCoverUrl}
          onStatusChange={setStatus}
          disabled={isSubmitting}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            isLoading={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
