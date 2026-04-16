import LoginForm from '@/features/auth/components/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full my-auto px-3'>
    <LoginForm/>
  </div>
}
