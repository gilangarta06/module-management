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
    <div>
      <div className="space-y-3">
        <button onClick={() => signIn('google')} className="w-full px-4 py-2 bg-white bg-opacity-10 rounded">Continue with Google</button>
        <button onClick={() => signIn('facebook')} className="w-full px-4 py-2 bg-white bg-opacity-10 rounded">Continue with Facebook</button>
        <button onClick={() => signIn('github')} className="w-full px-4 py-2 bg-white bg-opacity-10 rounded">Continue with Github</button>
        <button onClick={() => signIn('apple')} className="w-full px-4 py-2 bg-white bg-opacity-10 rounded">Continue with Apple</button>
      </div>

      <div className="my-4 border-b border-gray-700" />

      <form onSubmit={handleCredentialsLogin} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="mt-1 w-full px-3 py-2 bg-gray-900 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="mt-1 w-full px-3 py-2 bg-gray-900 rounded" />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-600 rounded">Login</button>
        {err && <p className="text-sm text-red-400">{err}</p>}
      </form>
    </div>
  )
}
