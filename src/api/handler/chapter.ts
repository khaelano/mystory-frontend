import { api } from '../client'
import type { Chapter } from '../schema'
import type { ChapterFilters, ChaptersResponse, CreateChapterInput, UpdateChapterInput } from '../schema'

/**
 * Get all chapters with pagination
 * @param filters - Pagination options (offset, limit)
 * @returns Paginated list of chapters
 */
export async function getChapters(
  filters?: ChapterFilters
): Promise<ChaptersResponse> {
  const params = new URLSearchParams()

  if (filters?.offset !== undefined) {
    params.append('offset', filters.offset.toString())
  }
  if (filters?.limit !== undefined) {
    params.append('limit', filters.limit.toString())
  }

  const queryString = params.toString()
  const endpoint = queryString ? `/chapters?${queryString}` : '/chapters'

  return api.get<ChaptersResponse>(endpoint)
}

/**
 * Get chapters for a specific story
 * @param storyId - Story ID
 * @param filters - Pagination options (offset, limit)
 * @returns Paginated list of chapters for the story
 */
export async function getChaptersByStory(
  storyId: string,
  filters?: ChapterFilters
): Promise<ChaptersResponse> {
  const params = new URLSearchParams()

  if (filters?.offset !== undefined) {
    params.append('offset', filters.offset.toString())
  }
  if (filters?.limit !== undefined) {
    params.append('limit', filters.limit.toString())
  }

  const queryString = params.toString()
  const endpoint = queryString
    ? `/stories/${storyId}/chapters?${queryString}`
    : `/stories/${storyId}/chapters`

  return api.get<ChaptersResponse>(endpoint)
}

/**
 * Get a single chapter by ID
 * @param chapterId - Chapter ID
 * @returns Chapter with parent story included
 */
export async function getChapterById(chapterId: string): Promise<Chapter> {
  return api.get<Chapter>(`/chapters/${chapterId}`)
}

/**
 * Create a new chapter for a story
 * @param storyId - Story ID
 * @param input - Chapter data (title, content)
 * @returns Created chapter
 */
export async function createChapter(
  storyId: string,
  input: Omit<CreateChapterInput, 'storyId'>
): Promise<Chapter> {
  const body: CreateChapterInput = {
    ...input,
    storyId,
  }
  return api.post<Chapter>(`/stories/${storyId}/chapters`, body)
}

/**
 * Update an existing chapter
 * @param chapterId - Chapter ID
 * @param input - Partial chapter data (title and/or content)
 * @returns Updated chapter
 */
export async function updateChapter(
  chapterId: string,
  input: UpdateChapterInput
): Promise<Chapter> {
  return api.put<Chapter>(`/chapters/${chapterId}`, input)
}

/**
 * Delete a chapter
 * @param chapterId - Chapter ID
 * @returns void (204 No Content)
 */
export async function deleteChapter(chapterId: string): Promise<void> {
  await api.delete<void>(`/chapters/${chapterId}`)
}
