import { createFileRoute, Link } from '@tanstack/react-router'
import { getStories } from '../../api/handler/story'
import { Button } from '../../components/button'

import { Route as createRoute } from './create'

export const Route = createFileRoute('/stories/')({
  component: RouteComponent,
  loader: () => getStories({ offset: 0, limit: 10 }),
})

function RouteComponent() {
  const response = Route.useLoaderData()
  const stories = response.data
  const pagination = response.pagination

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Stories</h1>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by Writers/Title"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <Button variant="outline" className="px-4">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </Button>
        <Link to={createRoute.to}>
          <Button variant="primary" leftIcon={<span>+</span>}>
            Add Story
          </Button>
        </Link>
      </div>

      {/* Stories Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-16">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Writers
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Keyword
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-24">
                Status
              </th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, index) => (
              <tr key={story.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">
                  {pagination.offset + index + 1}
                </td>
                <td className="px-4 py-4 text-sm font-medium">
                  <Link
                    to="/stories/$storyId"
                    params={{ storyId: story.id }}
                    className="text-gray-900 hover:text-orange-500"
                  >
                    {story.title}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {story.authorName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {story.category}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {story.keywords.slice(0, 2).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
                      >
                        {keyword}
                      </span>
                    ))}
                    {story.keywords.length > 2 && (
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
                        +{story.keywords.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      story.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {story.status === 'PUBLISHED' ? 'Publish' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Menampilkan {stories.length} dari {pagination.total} data
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.offset === 0}
          >
            &lt;
          </Button>
          <span className="text-sm text-gray-600">
            {Math.floor(pagination.offset / pagination.limit) + 1} /{' '}
            {Math.ceil(pagination.total / pagination.limit)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.offset + stories.length >= pagination.total}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
