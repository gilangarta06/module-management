import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">NextAuth + Mongoose Auth Template</h1>
      {session ? (
        <div>
          <p className="mb-4">Signed in as {session.user?.email}</p>
          <button
            className="px-4 py-2 bg-red-600 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link href="/auth/login" className="px-4 py-2 bg-green-600 rounded">
            Login
          </Link>
          <Link href="/auth/register" className="px-4 py-2 bg-gray-700 rounded">
            Register
          </Link>
        </div>
      )}
    </main>
  )
}
