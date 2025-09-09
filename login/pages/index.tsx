import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-6 text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Modul Login Gilang
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {session ? (
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/15 text-center transform hover:scale-105 transition-all duration-300 overflow-hidden">
            {/* Subtle Particle Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <p className="text-lg mb-2 text-gray-100">
                Halo, <span className="font-semibold text-green-400">{session?.user?.name || session?.user?.email}</span>
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Anda sudah masuk sebagai {session?.user?.email}
              </p>

              <button
                onClick={() => signOut()}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 border border-red-600/20"
              >
                🔐 Keluar (Sign Out)
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center space-y-4 sm:space-y-0">
            <Link
              href="/auth/login"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Masuk
            </Link>

            <Link
              href="/auth/register"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl font-bold text-white text-lg shadow-lg hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Daftar
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Modul Login Gilang
      </div>
    </main>
  )
}
