import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { getStoryById } from '../../../api/handler/story'
import { createChapter } from '../../../api/handler/chapter'
import { ChapterEditor } from '../../../components/forms/chapter-editor'
import { Button } from '../../../components/button'

export const Route = createFileRoute('/stories/$storyId/new-chapter')({
  component: RouteComponent,
  loader: ({ params }) => getStoryById(params.storyId),
})

function RouteComponent() {
  const story = Route.useLoaderData()
  const navigate = useNavigate()
  const { storyId } = Route.useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (data: { title: string; content: string }) => {
    setIsSubmitting(true)

    try {
      await createChapter(storyId, {
        title: data.title,
        content: data.content,
      })

      navigate({ to: '/stories/$storyId', params: { storyId } })
    } catch (err) {
      console.error('Failed to create chapter:', err)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
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

      <h1 className="text-2xl font-bold mb-2">Add Chapter</h1>
      <p className="text-gray-600 mb-6">Adding chapter to: {story.title}</p>

      <ChapterEditor
        onSave={handleSave}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Create Chapter"
      />
    </div>
  )
}
