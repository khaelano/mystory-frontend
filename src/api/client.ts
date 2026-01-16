// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Custom error class for API errors
export class ApiError extends Error {
    status: number
    data?: unknown

    constructor(
        message: string,
        status: number,
        data?: unknown
    ) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.data = data
    }
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(options?.headers ?? {}),
        },
        ...options,
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new ApiError(
            errorData?.message || response.statusText,
            response.status,
            errorData
        )
    }

    return response.json()
}

// HTTP method helpers
export const api = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        fetchApi<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
        fetchApi<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
        fetchApi<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
}