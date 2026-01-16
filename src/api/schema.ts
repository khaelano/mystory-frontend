export interface Chapter {
    id: string;
    title: string;
    content: string;
    storyId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ChaptersResponse {
    data: Chapter[];
    pagination: Pagination;
}

export interface CreateChapterInput {
    title: string;
    content: string;
    storyId: string;
}

export interface UpdateChapterInput {
    title?: string;
    content?: string;
}

export interface ChapterFilters {
    offset?: number;
    limit?: number;
}


export type StoryCategory = 'FINANCIAL' | 'TECHNOLOGY' | 'HEALTH'
export type StoryStatus = 'DRAFT' | 'PUBLISHED'

export interface Story {
    id: string
    title: string
    category: StoryCategory
    keywords: string[]
    status: StoryStatus
    coverUrl: string | null
    synopsis: string
    authorName: string
    createdAt: string
    updatedAt: string
    chapters: Chapter[]
}

export interface StoryListItem extends Omit<Story, 'chapters'> {
    chapters: []
}

export interface Pagination {
    offset: number
    limit: number
    total: number
}

export interface StoriesResponse {
    data: StoryListItem[]
    pagination: Pagination
}

export interface StoryFilters {
    offset?: number
    limit?: number
    category?: StoryCategory
    status?: StoryStatus
    search?: string
}

export interface CreateStoryInput {
    title: string
    category: StoryCategory
    synopsis: string
    authorName: string
    keywords?: string[]
    coverUrl?: string
    chapters?: Array<{
        title: string
        content: string
    }>
}

export interface UpdateStoryInput {
    title?: string
    category?: StoryCategory
    synopsis?: string
    keywords?: string[]
    status?: StoryStatus
    coverUrl?: string
}

