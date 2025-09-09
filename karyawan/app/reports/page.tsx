'use client';
import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';

export default function ReportsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [qname, setQname] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  async function fetchReports(){
    const params = new URLSearchParams();
    if (qname) params.set('name', qname);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const res = await fetch('/api/attendance?' + params.toString());
    const data = await res.json();
    setRows(data || []);
  }

  useEffect(()=>{ fetchReports(); }, []);

  function exportCsv(){
    const header = ['Nama','Jabatan','Lat','Lng','Distance(m)','Status','Tanggal'];
    const csv = [header.join(',')].concat(rows.map(r => [
      `"${r.employeeName}"`,
      `"${r.position}"`,
      r.lat,
      r.lng,
      r.distance,
      r.status,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ].join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'absensi.csv'; a.click();
  }

  return (
    <div>
      <Nav />
      <h2 className="text-2xl mb-4">Laporan Absensi</h2>
      <div className="card p-4 rounded mb-4">
        <div className="flex gap-2">
          <input value={qname} onChange={e=>setQname(e.target.value)} placeholder="Filter nama" className="p-2 rounded bg-transparent border" />
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="p-2 rounded bg-transparent border" />
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="p-2 rounded bg-transparent border" />
          <button onClick={fetchReports} className="px-3 py-2 rounded btn-primary">Filter</button>
          <button onClick={exportCsv} className="px-3 py-2 rounded border">Export CSV</button>
        </div>
      </div>
      <div className="card p-4 rounded">
        <table className="w-full text-left">
          <thead><tr><th>Nama</th><th>Jabatan</th><th>Distance (m)</th><th>Status</th><th>Tanggal</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r._id} className="border-t">
                <td>{r.employeeName}</td>
                <td>{r.position}</td>
                <td>{Math.round(r.distance)}</td>
                <td>{r.status}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}