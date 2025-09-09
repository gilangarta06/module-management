'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

type Props = {
  mode?: 'login';
};

export default function AuthForm({ mode = 'login' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setErr(res.error);
    } else {
      // redirect to homepage
      window.location.href = '/';
    }
  }

  return (
    <div className="space-y-5">
      {/* Button Social Login */}
      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 rounded-lg text-sm font-medium text-white border border-white/20 shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-1.31-.24-2.59-.68-3.69 1.08.02 2.15.21 3.15.57-.8-.11-1.55-.24-2.26-.33-.03 1.9-1.47 3.34-3.23 3.78-.74.15-1.44-.21-1.99-.68-.02.96.24 1.57.63 1.78.74-.13 1.43-.39 1.92-.73-1.26 0-2.45-.37-3.49-1.25-1.08.77-2.07 1.15-3.14 1.17-.52 0-1.04-.08-1.53-.14-.02 1.44.25 2.51.6 4.07-.76-.19-1.58-.35-2.38-.46-.01 0-.01 0-.02 0-.3.77-.17 1.58.15 2.27.5.04 1.14.24 1.76.24 1.45 0 2.59-.86 2.95-1.65.15.01.31.03.46.04.39-.28.77-.56 1.14-.83.15-.11.31-.28.44-.44.08.53.11 1.07.11 1.64 0 1.9-.62 3.14-1.11 3.78-.02-.56-.04-1.12-.04-1.67-.12.04-.24.07-.36.1-.94-.87-1.95-1.44-3.21-1.44-.39 0-.79.06-1.18.17-2.68-.09-4.72-2.67-4.72-5.51 0-.41.04-.83.1-1.22h-2.22c-.55 2.24.69 4.26 2.52 5.26 1.23.82 2.55 1 3.76.63 1.46.16 2.64.42 3.81.68.29 0 .59-.01.87-.04.63.05 1.17.08 1.73.08 1.29 0 2.59-.33 3.7-.74-.99.26-1.94.41-2.72.46-.1-1.27-.55-2.03-1.03-2.75h-1.82c1.81-.94 3.34-2.16 4.04-6.27a1.28 1.28 0 00-.43-1.13h-.02z"/>
          </svg>
          Masuk dengan Google
        </button>

        <button
          onClick={() => signIn('facebook')}
          className="flex items-center justify-center px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 rounded-lg text-sm font-medium text-white border border-white/20 shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.15h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Masuk dengan Facebook
        </button>

        <button
          onClick={() => signIn('github')}
          className="flex items-center justify-center px-4 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 rounded-lg text-sm font-medium text-white border border-white/20 shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#191919" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.599 1.139 1.744 1.805 3.041 1.805 1.231 0 2.374-.594 3.207-1.983 1.009-1.683 1.117-3.785.031-4.312-1.559-1.868.586-4.736 1.461-6.797l1.857 3.983c1.86-.543 3.695-1.235 3.695-1.235-8.077-.053-14.742-6.963-14.742-15.204 0-5.003 2.064-10.253 7.193-13.195 4.553-2.592 10.545-2.75 15.484-.21h-1.263c-2.099-2.564-5.319-4.046-8.76-4.046-4.001 0-7.784 2.238-9.338 5.47-.827-.045-1.638-.045-2.442-.045-5.518 0-9.675 4.656-9.675 8.778 0 4.525 3.875 8.329 8.764 8.329l2.883-8.579c1.546 0 3.080.284 4.232-.478L24 5.438c-3.055-3.168-7.036-5.019-11.025-5.019h1.66c1.346-5.834 7.955-7.722 13.29-7.722-1.370 0-2.693.873-2.693 2.415 0 .986-2.24 1.301-3.184 1.301l-2.927 8.579h3.036c1.093-.023 2.182-.023 3.277-.023 5.185 0 9.315 4.094 9.315 8.852 0 5.413-4.385 9.82-9.766 9.82-5.929 0-10.785-5.391-10.785-11.787 0-3.332 1.26-4.531 3.45-5.051 1.117-1.452-.355-3.121-1.237-3.121-1.695 0-2.341 1.435-2.341 3.13 0 1.034.557 5.882-2.599 6.814 1.416 5.502 3.977 9.34 7.21 12.768.126-.015.25-.015.375-.015 2.644 0 4.211-1.055 5.115-2.824l-.219 2.763c-2.569 1.348-5.074 2.198-7.64 2.198-4.041 0-8.088-1.673-10.871-4.052-1.232-1.621-2.825-1.658-2.825-2.076 0-.717.918-.628 1.343-.628 1.126 0 2.678.763 3.542 1.556 2.717 3.279 7.047 3.392 8.852 3.436-.171 1.438-1.084 2.843-2.553 3.513-1.529.816-3.855 1.738-6.587 2.701 3.276-2.497 4.277-4.339 4.286-6.386 0-2.742-2.346-4.174-5.295-6.037-1.875-.141-4.777-.34-8.116.155-.246 1.199-.525 2.265-.874 3.37-.433-1.649-.644-2.728-.855-3.617.86 0 1.715-.19 2.548-.537 1.339-.113 2.336-2.079 3.801-2.598 2.564-.752 4.408.934 4.603 1.53-.795-.503-1.396-1.549-1.665-2.951l.75-1.339c-.574-.564-1.385-1.042-2.006-1.156-1.185.373-2.006 1.523-2.039 2.797-1.027-.703-2.381-1.418-3.974-1.418-1.327 0-2.538.241-3.196.571-.599 3.111.115 6.549 1.45 9.909.115 0 .232.007.347.007 2.63-.098 3.557-2.93 4.074-8.161l-3.925 2.054c-.42-.252-.84-.921-1.068-1.144-.087 2.291.807 3.725 2.046 4.965.731.898 1.801 1.358 3.131 1.358 4.281 0 8.025-4.894 8.895-6.182 1.106-3.661 1.218-5.74 1.218-6.688 0-4.159-2.322-7.383-5.841-9.11C15.641 1.552 12.888 0 12 0z"/>
          </svg>
          Masuk dengan GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-900 px-2 text-gray-500">atau</span>
        </div>
      </div>

      {/* Form Login */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="contoh@domain.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Kata Sandi</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="mt-1 block w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan kata sandi"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02]"
        >
          Masuk
        </button>

        {err && (
          <p className="text-sm text-red-400 mt-2 animate-pulse">
            {err}
          </p>
        )}
      </form>
    </div>
  );
}
