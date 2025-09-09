'use client';
import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';

export default function SettingsPage() {
  const [form, setForm] = useState({officeLat:'', officeLng:'', radiusMeter:100, workStart:'08:00', workEnd:'17:00'});

  useEffect(()=>{ fetchSettings(); },[]);

  async function fetchSettings(){
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data) setForm({
      officeLat: String(data.officeLat || ''),
      officeLng: String(data.officeLng || ''),
      radiusMeter: data.radiusMeter || 100,
      workStart: data.workStart || '08:00',
      workEnd: data.workEnd || '17:00'
    });
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    await fetch('/api/settings', {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        officeLat: Number(form.officeLat),
        officeLng: Number(form.officeLng),
        radiusMeter: Number(form.radiusMeter),
        workStart: form.workStart,
        workEnd: form.workEnd
      })
    });
    alert('Disimpan');
  }

  return (
    <div>
      <Nav />
      <h2 className="text-2xl mb-4">Pengaturan</h2>
      <form onSubmit={submit} className="card p-4 rounded">
        <input value={form.officeLat} onChange={e=>setForm({...form,officeLat:e.target.value})} placeholder="Office Latitude" className="p-2 rounded bg-transparent border mb-2" />
        <input value={form.officeLng} onChange={e=>setForm({...form,officeLng:e.target.value})} placeholder="Office Longitude" className="p-2 rounded bg-transparent border mb-2" />
        <input value={String(form.radiusMeter)} onChange={e=>setForm({...form,radiusMeter: Number(e.target.value)})} placeholder="Radius (meter)" className="p-2 rounded bg-transparent border mb-2" />
        <label>Jam Masuk</label>
        <input value={form.workStart} onChange={e=>setForm({...form,workStart:e.target.value})} type="time" className="p-2 rounded bg-transparent border mb-2" />
        <label>Jam Pulang</label>
        <input value={form.workEnd} onChange={e=>setForm({...form,workEnd:e.target.value})} type="time" className="p-2 rounded bg-transparent border mb-2" />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary px-3 py-2 rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}