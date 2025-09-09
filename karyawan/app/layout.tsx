import './globals.css';
export const metadata = {
  title: 'Absensi Digital',
  description: 'Sistem absensi digital',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white min-h-screen">
        <div className="max-w-5xl mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}