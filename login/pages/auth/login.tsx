import AuthForm from '../../components/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 p-6">
      <div className="w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 text-white transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent animate-fade-in-up">
              🔐 Masuk ke Akun
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Dapatkan akses ke fitur khusus — langsung dari sini.
            </p>
          </div>
          <div className="relative z-10">
            <AuthForm mode="login" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </div>
    </div>
  )
}
