import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
