'use client';
import React, { useRef, useState } from 'react';
import Nav from '../../components/Nav';

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement|null>(null);
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const [captured, setCaptured] = useState<string| null>(null);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  async function startCamera(){
    setStatusMsg('Meminta akses kamera...');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatusMsg('');
    } catch (e:any) {
      setStatusMsg('Gagal akses kamera: ' + e.message);
    }
  }

  function capture(){
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(v,0,0,c.width,c.height);
    const data = c.toDataURL('image/jpeg', 0.9);
    setCaptured(data);
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    setStatusMsg('Mencari lokasi...');
    if (!captured) { setStatusMsg('Silakan ambil foto selfie terlebih dahulu'); return; }

    // get position
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // convert dataURL to blob
      const res = await fetch(captured);
      const blob = await res.blob();
      const fd = new FormData();
      fd.append('name', name);
      fd.append('position', position);
      fd.append('lat', String(lat));
      fd.append('lng', String(lng));
      fd.append('photo', blob, 'selfie.jpg');

      setStatusMsg('Mengirim absensi...');

      const resp = await fetch('/api/attendance', { method: 'POST', body: fd });
      const data = await resp.json();
      if (resp.ok) {
        setStatusMsg('Absensi ' + data.status);
      } else {
        setStatusMsg('Gagal: ' + (data?.message || resp.statusText));
      }
    }, (err)=>{
      setStatusMsg('Gagal mendapatkan lokasi: ' + err.message);
    }, { enableHighAccuracy: true });
  }

  return (
    <div>
      <Nav />
      <h2 className="text-2xl mb-4">Absensi</h2>
      <div className="card p-4 rounded mb-4">
        <div>
          <button onClick={startCamera} className="px-3 py-2 rounded btn-primary">Start Camera</button>
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          <div>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded bg-black"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="mt-2">
              <button onClick={capture} className="px-3 py-2 rounded border">Capture</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Preview</h4>
            {captured ? <img src={captured} alt="preview" className="w-full rounded" /> : <div className="h-48 bg-gray-800 rounded flex items-center justify-center">No image</div>}
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="card p-4 rounded">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama" className="p-2 rounded bg-transparent border w-full mb-2" required />
        <input value={position} onChange={e=>setPosition(e.target.value)} placeholder="Jabatan" className="p-2 rounded bg-transparent border w-full mb-2" required />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary px-3 py-2 rounded">Kirim Absensi</button>
        </div>
      </form>

      <p className="mt-3">{statusMsg}</p>
    </div>
  );
}