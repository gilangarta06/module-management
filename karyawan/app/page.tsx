import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1 className="text-3xl font-semibold mb-6">Absensi Digital - Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/employees"><div className="card p-4 rounded-lg shadow">Manajemen Karyawan</div></Link>
        <Link href="/attendance"><div className="card p-4 rounded-lg shadow">Absensi</div></Link>
        <Link href="/reports"><div className="card p-4 rounded-lg shadow">Laporan</div></Link>
        <Link href="/settings"><div className="card p-4 rounded-lg shadow">Pengaturan</div></Link>
      </div>
    </main>
  );
}