import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DraftStoryProvider } from '../context/draft-story'

const RootComponent = () => {
  return (
    <DraftStoryProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </DraftStoryProvider>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})