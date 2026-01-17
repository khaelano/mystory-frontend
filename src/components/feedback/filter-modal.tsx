import { useState } from 'react'
import { Modal } from './modal'
import { DropdownInput } from '../inputs/dropdown-input'
import { Button } from '../button'
import type { StoryCategory, StoryStatus } from '../../api/schema'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  initialCategory?: StoryCategory
  initialStatus?: StoryStatus
  onApply: (filters: { category?: StoryCategory; status?: StoryStatus }) => void
  onReset: () => void
}

const categoryOptions = [
  { value: 'FINANCIAL', label: 'Financial' },
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'HEALTH', label: 'Health' },
]

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PUBLISHED', label: 'Published' },
]

export function FilterModal({
  isOpen,
  onClose,
  initialCategory,
  initialStatus,
  onApply,
  onReset,
}: FilterModalProps) {
  const [category, setCategory] = useState<StoryCategory | undefined>(initialCategory)
  const [status, setStatus] = useState<StoryStatus | undefined>(initialStatus)

  const handleApply = () => {
    onApply({ category, status })
    onClose()
  }

  const handleReset = () => {
    setCategory(undefined)
    setStatus(undefined)
    onReset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Header>
        <h2 className="text-xl font-semibold text-gray-900">Filter Stories</h2>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <DropdownInput
            label="Category"
            value={category || ''}
            onChange={(value) => setCategory(value as StoryCategory || undefined)}
            options={categoryOptions}
            placeholder="All Categories"
          />
          <DropdownInput
            label="Status"
            value={status || ''}
            onChange={(value) => setStatus(value as StoryStatus || undefined)}
            options={statusOptions}
            placeholder="All Statuses"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
