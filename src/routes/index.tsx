import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: () => {
    throw Route.redirect({ to: '/stories' })
  },
})

function RouteComponent() {
  return <div className='text-sm'>Hello "/"!</div>
}
