import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { getStoryById, deleteStory } from '../../../api/handler/story'
import { deleteChapter } from '../../../api/handler/chapter'
import { Button } from '../../../components/button'
import { PageContainer } from '../../../components/layout/page-container'
import { Card } from '../../../components/layout/card'
import { Breadcrumb } from '../../../components/data-display/breadcrumb'
import { StatusBadge } from '../../../components/data-display/status-badge'
import { Badge } from '../../../components/data-display/badge'
import { KeywordList } from '../../../components/data-display/keyword-list'
import { ConfirmationDialog } from '../../../components/feedback/confirmation-dialog'
import { EmptyState } from '../../../components/feedback/empty-state'
import { DotPagination } from '../../../components/navigation/dot-pagination'

export const Route = createFileRoute('/stories/$storyId/')({
  component: RouteComponent,
  loader: ({ params }) => getStoryById(params.storyId),
})

function RouteComponent() {
  const story = Route.useLoaderData()
  const navigate = useNavigate()
  const { storyId } = Route.useParams()
  
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteChapterModal, setShowDeleteChapterModal] = useState(false)
  const [chapterToDelete, setChapterToDelete] = useState<string | null>(null)
  const [isDeletingChapter, setIsDeletingChapter] = useState(false)

  const currentChapter = story.chapters[currentChapterIndex]
  const hasChapters = story.chapters.length > 0

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteStory(story.id)
      navigate({ to: '/stories' })
    } catch (error) {
      console.error('Failed to delete story:', error)
      setIsDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const handleDeleteChapter = async () => {
    if (!chapterToDelete) return

    setIsDeletingChapter(true)
    try {
      await deleteChapter(chapterToDelete)
      navigate({ to: '/stories/$storyId', params: { storyId }, replace: true })
    } catch (error) {
      console.error('Failed to delete chapter:', error)
    } finally {
      setIsDeletingChapter(false)
      setShowDeleteChapterModal(false)
      setChapterToDelete(null)
    }
  }

  return (
    <PageContainer size="md">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Stories', to: '/stories' },
          { label: story.title },
        ]}
      />

      {/* Story Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h1>
            <p className="text-gray-600 mb-3">by {story.authorName}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="primary">{story.category}</Badge>
              <StatusBadge status={story.status} />
            </div>
            {story.keywords.length > 0 && (
              <KeywordList keywords={story.keywords} maxVisible={10} />
            )}
          </div>
          {story.coverUrl && (
            <img
              src={story.coverUrl}
              alt={story.title}
              className="w-32 h-44 object-cover rounded-lg shadow-sm"
            />
          )}
        </div>
        <p className="text-gray-700 leading-relaxed">{story.synopsis}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <Link to="/stories/$storyId/edit" params={{ storyId }}>
          <Button variant="primary">Edit Story</Button>
        </Link>
        <Link to="/stories/$storyId/new-chapter" params={{ storyId }}>
          <Button variant="secondary" leftIcon={<span>+</span>}>
            Add Chapter
          </Button>
        </Link>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete Story
        </Button>
      </div>

      {/* Chapter Viewer */}
      {hasChapters ? (
        <Card>
          {/* Chapter Header */}
          <Card.Header className="bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-500">
                  Chapter {currentChapterIndex + 1} of {story.chapters.length}
                </span>
                <h2 className="text-lg font-semibold text-gray-900">
                  {currentChapter.title}
                </h2>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/stories/$storyId/chapters/$chapterId/edit"
                  params={{ storyId, chapterId: currentChapter.id }}
                >
                  <Button variant="outline" size="sm">
                    Edit Chapter
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setChapterToDelete(currentChapter.id)
                    setShowDeleteChapterModal(true)
                  }}
                >
                  🗑️
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentChapterIndex === 0}
                  onClick={() => setCurrentChapterIndex((i) => i - 1)}
                >
                  ← Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentChapterIndex === story.chapters.length - 1}
                  onClick={() => setCurrentChapterIndex((i) => i + 1)}
                >
                  Next →
                </Button>
              </div>
            </div>
          </Card.Header>

          {/* Chapter Content */}
          <Card.Body>
            <div className="prose prose-gray max-w-none whitespace-pre-wrap">
              {currentChapter.content}
            </div>
          </Card.Body>

          {/* Chapter Navigation Footer */}
          <Card.Footer className="bg-gray-50">
            <DotPagination
              total={story.chapters.length}
              current={currentChapterIndex}
              onNavigate={setCurrentChapterIndex}
              onPrevious={() => setCurrentChapterIndex((i) => i - 1)}
              onNext={() => setCurrentChapterIndex((i) => i + 1)}
            />
          </Card.Footer>
        </Card>
      ) : (
        <EmptyState
          message="This story has no chapters yet."
          action={
            <Link to="/stories/$storyId/new-chapter" params={{ storyId }}>
              <Button variant="primary" leftIcon={<span>+</span>}>
                Add Chapter
              </Button>
            </Link>
          }
        />
      )}

      {/* Delete Story Confirmation */}
      <ConfirmationDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Story"
        message={`Are you sure you want to delete "${story.title}"? This action cannot be undone and all chapters will be permanently removed.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        variant="danger"
      />

      {/* Delete Chapter Confirmation */}
      <ConfirmationDialog
        isOpen={showDeleteChapterModal}
        onClose={() => {
          setShowDeleteChapterModal(false)
          setChapterToDelete(null)
        }}
        onConfirm={handleDeleteChapter}
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeletingChapter}
        variant="danger"
      />
    </PageContainer>
  )
}
