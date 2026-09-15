import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient } from '#/lib/query-client'
import { setOnSessionExpired } from './lib/api-client'
import { getRouter } from './router'

const router = getRouter()

setOnSessionExpired(() => {
  queryClient.clear()
  void router.invalidate()
})

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}
