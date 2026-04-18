import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

interface MyRouterContext {
  isAuthenticated: boolean
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}