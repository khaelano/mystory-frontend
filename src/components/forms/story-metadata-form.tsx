import { TextInput } from '../inputs/text-input'
import { TextArea } from '../inputs/text-area'
import { DropdownInput } from '../inputs/dropdown-input'
import { KeywordInput } from '../inputs/keyword-input'
import type { StoryCategory, StoryStatus } from '../../api/schema'

interface StoryMetadataFormProps {
  title: string
  authorName: string
  synopsis: string
  category: StoryCategory
  keywords: string[]
  coverUrl: string
  status: StoryStatus
  onTitleChange: (value: string) => void
  onAuthorNameChange: (value: string) => void
  onSynopsisChange: (value: string) => void
  onCategoryChange: (value: StoryCategory) => void
  onKeywordsChange: (value: string[]) => void
  onCoverUrlChange: (value: string) => void
  onStatusChange: (value: StoryStatus) => void
  disabled?: boolean
}

export function StoryMetadataForm({
  title,
  authorName,
  synopsis,
  category,
  keywords,
  coverUrl,
  status,
  onTitleChange,
  onAuthorNameChange,
  onSynopsisChange,
  onCategoryChange,
  onKeywordsChange,
  onCoverUrlChange,
  onStatusChange,
  disabled = false,
}: StoryMetadataFormProps) {
  return (
    <div className="space-y-4">
      {/* Title and Writer Name Row */}
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Title"
          required
          disabled={disabled}
        />
        <TextInput
          label="Writer Name"
          value={authorName}
          onChange={(e) => onAuthorNameChange(e.target.value)}
          placeholder="Writer Name"
          required
          disabled={disabled}
        />
      </div>

      {/* Synopsis */}
      <TextArea
        label="Synopsis"
        value={synopsis}
        onChange={(e) => onSynopsisChange(e.target.value)}
        placeholder="Synopsis"
        rows={4}
        required
        disabled={disabled}
      />

      {/* Category and Tags/Keywords Row */}
      <div className="grid grid-cols-2 gap-4">
        <DropdownInput
          label="Category"
          value={category}
          onChange={(value) => onCategoryChange(value as StoryCategory)}
          options={[
            { value: 'TECHNOLOGY', label: 'Technology' },
            { value: 'HEALTH', label: 'Health' },
            { value: 'FINANCIAL', label: 'Financial' },
          ]}
          placeholder="Category"
          required
          disabled={disabled}
        />
        <KeywordInput
          label="Tags/Keywords Story"
          value={keywords}
          onChange={onKeywordsChange}
          disabled={disabled}
        />
      </div>

      {/* Cover Image and Status Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cover Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {coverUrl ? (
              <div className="relative">
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="max-h-32 mx-auto rounded"
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => onCoverUrlChange('')}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  id="cover-upload"
                  accept="image/*"
                  disabled={disabled}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      onCoverUrlChange(URL.createObjectURL(file))
                    }
                  }}
                />
                <label
                  htmlFor="cover-upload"
                  className={`cursor-pointer text-blue-600 hover:text-blue-700 ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Upload Image
                </label>
              </div>
            )}
          </div>
        </div>
        <DropdownInput
          label="Status"
          value={status}
          onChange={(value) => onStatusChange(value as StoryStatus)}
          options={[
            { value: 'DRAFT', label: 'Draft' },
            { value: 'PUBLISHED', label: 'Publish' },
          ]}
          placeholder="Status"
          required
          disabled={disabled}
        />
      </div>
    </div>
  )
}
