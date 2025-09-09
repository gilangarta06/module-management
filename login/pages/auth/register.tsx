import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register', { name, email, password })
      setMessage('Registration successful. You can now login.')
      setTimeout(() => router.push('/auth/login'), 1200)
    } catch (err: any) {
      setMessage(err?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full px-3 py-2 bg-gray-900 rounded" />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 bg-gray-900 rounded" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 bg-gray-900 rounded" />
          </div>
          <button className="w-full px-4 py-2 bg-green-600 rounded" type="submit">Register</button>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </div>
    </div>
  )
}
