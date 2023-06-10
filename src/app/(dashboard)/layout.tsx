import PrivateRoute from './PrivateRoute'

export default function DashLayout({ children }: { children: React.ReactNode }) {
   return <PrivateRoute>{children}</PrivateRoute>
}
