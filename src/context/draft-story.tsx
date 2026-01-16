import { createContext, useContext, useState } from 'react'
import type { StoryCategory, StoryStatus } from '../api/schema'

export interface DraftChapter {
  title: string
  content: string
}

export interface DraftStory {
  id?: string // undefined when creating, set when editing
  title: string
  authorName: string
  synopsis: string
  category: StoryCategory
  keywords: string[]
  coverUrl?: string
  status: StoryStatus
  chapters: DraftChapter[]
}

interface DraftStoryContextType {
  draft: DraftStory | null
  setDraft: (draft: DraftStory) => void
  updateDraft: (partial: Partial<DraftStory>) => void
  addChapter: (chapter: DraftChapter) => void
  updateChapter: (index: number, chapter: DraftChapter) => void
  removeChapter: (index: number) => void
  clearDraft: () => void
}

const DraftStoryContext = createContext<DraftStoryContextType | undefined>(undefined)

export function DraftStoryProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<DraftStory | null>(null)

  const updateDraft = (partial: Partial<DraftStory>) => {
    setDraft((prev) => prev ? { ...prev, ...partial } : null)
  }

  const addChapter = (chapter: DraftChapter) => {
    setDraft((prev) => {
      if (!prev) return null
      return {
        ...prev,
        chapters: [...prev.chapters, chapter],
      }
    })
  }

  const updateChapter = (index: number, chapter: DraftChapter) => {
    setDraft((prev) => {
      if (!prev) return null
      const chapters = [...prev.chapters]
      chapters[index] = chapter
      return { ...prev, chapters }
    })
  }

  const removeChapter = (index: number) => {
    setDraft((prev) => {
      if (!prev) return null
      return {
        ...prev,
        chapters: prev.chapters.filter((_, i) => i !== index),
      }
    })
  }

  const clearDraft = () => {
    setDraft(null)
  }

  return (
    <DraftStoryContext.Provider
      value={{
        draft,
        setDraft,
        updateDraft,
        addChapter,
        updateChapter,
        removeChapter,
        clearDraft,
      }}
    >
      {children}
    </DraftStoryContext.Provider>
  )
}

export function useDraftStory() {
  const context = useContext(DraftStoryContext)
  if (!context) {
    throw new Error('useDraftStory must be used within DraftStoryProvider')
  }
  return context
}
