'use client';
import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';

type Employee = {
  _id: string;
  name: string;
  position: string;
  nik: string;
  photo?: string;
};

export default function EmployeesPage() {
  const [list, setList] = useState<Employee[]>([]);
  const [form, setForm] = useState({name:'', position:'', nik:''});
  const [editing, setEditing] = useState<string | null>(null);

  async function fetchList() {
    const res = await fetch('/api/employees');
    const data = await res.json();
    setList(data || []);
  }

  useEffect(()=>{ fetchList(); },[]);

  async function submit(e:React.FormEvent) {
    e.preventDefault();
    if (editing) {
      await fetch('/api/employees/'+editing, {
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      setEditing(null);
    } else {
      await fetch('/api/employees', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
    }
    setForm({name:'', position:'', nik:''});
    fetchList();
  }

  async function remove(id:string){
    if (!confirm('Hapus karyawan?')) return;
    await fetch('/api/employees/'+id, { method:'DELETE' });
    fetchList();
  }

  function startEdit(emp:Employee){
    setEditing(emp._id);
    setForm({name:emp.name, position:emp.position, nik:emp.nik});
  }

  return (
    <div>
      <Nav />
      <h2 className="text-2xl mb-4">Manajemen Karyawan</h2>
      <div className="card p-4 rounded mb-6">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nama" className="p-2 rounded bg-transparent border" required />
          <input value={form.position} onChange={e=>setForm({...form,position:e.target.value})} placeholder="Jabatan" className="p-2 rounded bg-transparent border" required />
          <input value={form.nik} onChange={e=>setForm({...form,nik:e.target.value})} placeholder="Nomor Induk" className="p-2 rounded bg-transparent border" required />
          <div className="flex gap-2">
            <button className="btn-primary px-3 py-2 rounded" type="submit">{editing ? 'Update' : 'Tambah'}</button>
            {editing && <button type="button" onClick={()=>{setEditing(null); setForm({name:'',position:'',nik:''})}} className="px-3 py-2 rounded border">Batal</button>}
          </div>
        </form>
      </div>

      <div className="card p-4 rounded">
        <h3 className="font-semibold mb-2">Daftar Karyawan</h3>
        <table className="w-full text-left">
          <thead>
            <tr><th>Nama</th><th>Jabatan</th><th>NIK</th><th>Action</th></tr>
          </thead>
          <tbody>
            {list.map(l=>(
              <tr key={l._id} className="border-t">
                <td>{l.name}</td>
                <td>{l.position}</td>
                <td>{l.nik}</td>
                <td>
                  <button onClick={()=>startEdit(l)} className="mr-2">Edit</button>
                  <button onClick={()=>remove(l._id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}