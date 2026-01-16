import { api } from '../client'
import type {
    Story,
    StoriesResponse,
    StoryFilters,
    CreateStoryInput,
    UpdateStoryInput,
} from '../schema'

/**
 * Get a list of stories with optional filtering and search
 * @param filters - Filter options (offset, limit, category, status, search)
 * @returns Paginated list of stories
 */
export async function getStories(filters?: StoryFilters): Promise<StoriesResponse> {
    const params = new URLSearchParams()
    
    if (filters?.offset !== undefined) {
        params.append('offset', filters.offset.toString())
    }
    if (filters?.limit !== undefined) {
        params.append('limit', filters.limit.toString())
    }
    if (filters?.category) {
        params.append('category', filters.category)
    }
    if (filters?.status) {
        params.append('status', filters.status)
    }
    if (filters?.search) {
        params.append('search', filters.search)
    }

    const queryString = params.toString()
    const endpoint = queryString ? `/stories?${queryString}` : '/stories'
    
    return api.get<StoriesResponse>(endpoint)
}

/**
 * Get a single story by ID with all chapters
 * @param id - Story ID
 * @returns Story with chapters
 */
export async function getStoryById(id: string): Promise<Story> {
    return api.get<Story>(`/stories/${id}`)
}

/**
 * Create a new story
 * @param input - Story data (title, category, synopsis, authorName, keywords, coverUrl, chapters)
 * @returns Created story object
 */
export async function createStory(input: CreateStoryInput): Promise<Story> {
    return api.post<Story>('/stories', input)
}

/**
 * Update an existing story
 * @param id - Story ID
 * @param input - Partial story data (all fields optional)
 * @returns Updated story object
 */
export async function updateStory(
    id: string,
    input: UpdateStoryInput
): Promise<Story> {
    return api.put<Story>(`/stories/${id}`, input)
}

/**
 * Delete a story
 * @param id - Story ID
 * @returns void (204 No Content)
 */
export async function deleteStory(id: string): Promise<void> {
    await api.delete<void>(`/stories/${id}`)
}