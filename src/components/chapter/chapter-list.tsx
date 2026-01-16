import type { DraftChapter } from '../../context/draft-story'

interface ChapterListProps {
  chapters: DraftChapter[]
  onRemove: (index: number) => void
}

export function ChapterList({ chapters, onRemove }: ChapterListProps) {
  if (chapters.length === 0) {
    return <p className="text-gray-500 italic">No chapters added yet</p>
  }

  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => (
        <div
          key={index}
          className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
        >
          <div className="flex-1">
            <p className="font-medium">
              Chapter {index + 1}: {chapter.title}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {chapter.content}
            </p>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            type="button"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
