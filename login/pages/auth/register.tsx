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
      setMessage('Pendaftaran berhasil! Anda bisa masuk sekarang.')
      setTimeout(() => router.push('/auth/login'), 1200)
    } catch (err: any) {
      setMessage(err?.response?.data?.error || 'Pendaftaran gagal. Coba lagi.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 p-6">
      {/* Container Utama */}
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 text-white transform hover:scale-[1.02] transition-all duration-300 overflow-hidden relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fade-in-up">
              🌟 Daftar Akun
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 text-white placeholder-gray-500"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200 text-white placeholder-gray-500"
                placeholder="contoh@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 text-white placeholder-gray-500"
                placeholder="Masukkan kata sandi"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
            >
              Daftar Sekarang
            </button>
          </form>

          {/* Pesan Status */}
          {message && (
            <div className="mt-6 text-center">
              <p
                className={`text-sm ${
                  message.includes('gagal') ? 'text-red-400' : 'text-green-400'
                } animate-fade-in-up transition-opacity duration-300`}
              >
                {message}
              </p>
            </div>
          )}

          {/* Subtle Background Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </div>
  )
}
