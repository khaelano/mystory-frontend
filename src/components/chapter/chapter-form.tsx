import { TextInput } from "../../components/inputs/text-input"

interface ChapterFormProps {
  title: string
  content: string
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onAdd: () => void
}

export function ChapterForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onAdd,
}: ChapterFormProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Add New Chapter</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Chapter Title *
          </label>
          <TextInput
            label="Chapter Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Chapter 1: The Beginning"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Chapter Content *
          </label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Write your chapter content here..."
            rows={8}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={onAdd}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          type="button"
        >
          Add Chapter
        </button>
      </div>
    </div>
  )
}
