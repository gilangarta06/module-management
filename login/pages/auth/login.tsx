import AuthForm from '../../components/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <AuthForm mode="login" />
      </div>
    </div>
  )
}
