import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useDraftStory } from '../../../context/draft-story'
import { TextInput } from '../../../components/inputs/text-input'
import { TextArea } from '../../../components/inputs/text-area'
import { DropdownInput } from '../../../components/inputs/dropdown-input'
import { KeywordInput } from '../../../components/inputs/keyword-input'
import { Button } from '../../../components/button'
import type { StoryCategory, StoryStatus } from '../../../api/schema'

export const Route = createFileRoute('/stories/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { draft, setDraft } = useDraftStory()

  const [title, setTitle] = useState(draft?.title || '')
  const [authorName, setAuthorName] = useState(draft?.authorName || '')
  const [synopsis, setSynopsis] = useState(draft?.synopsis || '')
  const [category, setCategory] = useState<StoryCategory>(draft?.category || 'TECHNOLOGY')
  const [keywords, setKeywords] = useState<string[]>(draft?.keywords || [])
  const [coverUrl, setCoverUrl] = useState(draft?.coverUrl || '')
  const [status, setStatus] = useState<StoryStatus>(draft?.status || 'DRAFT')

  const handleContinue = () => {
    if (!title || !authorName || !synopsis) {
      alert('Please fill in all required fields')
      return
    }

    setDraft({
      title,
      authorName,
      synopsis,
      category,
      keywords,
      coverUrl,
      status,
      chapters: draft?.chapters || [],
      ...(draft?.id && { id: draft.id }),
    })

    navigate({ to: '/stories/create/new-chapter' })
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/stories' })}
          leftIcon={<span>←</span>}
        >
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Add Stories</h1>

      <div className="space-y-6">
        <div>
          {/* Title and Writer Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <TextInput
              label="Writer Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Writer Name"
              required
            />
          </div>

          {/* Synopsis */}
          <TextArea
            label="Synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            placeholder="Synopsis"
            rows={4}
            required
          />

          {/* Category and Tags/Keywords Row */}
          <div className="grid grid-cols-2 gap-4">
            <DropdownInput
              label="Category"
              value={category}
              onChange={(value) => setCategory(value as StoryCategory)}
              options={[
                { value: 'TECHNOLOGY', label: 'Technology' },
                { value: 'HEALTH', label: 'Health' },
                { value: 'FINANCIAL', label: 'Financial' },
              ]}
              placeholder="Category"
              required
            />
            <KeywordInput
              label="Tags/Keywords Story"
              value={keywords}
              onChange={setKeywords}
            />
          </div>

          {/* Cover Image and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    id="cover-upload"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setCoverUrl(URL.createObjectURL(file))
                      }
                    }}
                  />
                  <label
                    htmlFor="cover-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    Upload Image
                  </label>
                </div>
              </div>
            </div>
            <DropdownInput
              label="Status"
              value={status}
              onChange={(value) => setStatus(value as StoryStatus)}
              options={[
                { value: 'DRAFT', label: 'Draft' },
                { value: 'PUBLISHED', label: 'Publish' },
              ]}
              placeholder="Status"
              required
            />
          </div>
        </div>

        {/* Add Chapter Button */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleContinue}
            leftIcon={<span>+</span>}
          >
            Add Chapter
          </Button>
        </div>

        {/* Chapters Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Updated</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {draft?.chapters && draft.chapters.length > 0 ? (
                draft.chapters.map((chapter, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-sm">{chapter.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date().toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button className="text-gray-400 hover:text-gray-600">⋮</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500 text-sm">
                    No chapters added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/stories' })}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}