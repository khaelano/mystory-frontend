import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { getChapterById, updateChapter } from '../../../../../api/handler/chapter'
import { ChapterEditor } from '../../../../../components/forms/chapter-editor'
import { Button } from '../../../../../components/button'

export const Route = createFileRoute('/stories/$storyId/chapters/$chapterId/edit')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      return await getChapterById(params.chapterId)
    } catch (error) {
      console.error('Failed to load chapter:', error)
      throw error
    }
  },
  errorComponent: ErrorComponent,
})

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Failed to load chapter</p>
        <p>{error.message}</p>
      </div>
    </div>
  )
}

function RouteComponent() {
  const chapter = Route.useLoaderData()
  const navigate = useNavigate()
  const { storyId, chapterId } = Route.useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (data: { title: string; content: string }) => {
    setIsSubmitting(true)

    try {
      await updateChapter(chapterId, {
        title: data.title,
        content: data.content,
      })

      navigate({ to: '/stories/$storyId', params: { storyId } })
    } catch (err) {
      console.error('Failed to update chapter:', err)
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

      <h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>

      <ChapterEditor
        initialTitle={chapter.title}
        initialContent={chapter.content}
        onSave={handleSave}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Save Changes"
      />
    </div>
  )
}
