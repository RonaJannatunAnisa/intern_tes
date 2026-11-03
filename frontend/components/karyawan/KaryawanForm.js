"use client";

import { useState } from "react";
import Link from "next/link";

const emptyForm = { nama: "", email: "", jabatan: "", gaji: "" };

export default function KaryawanForm({
  initialData = emptyForm,
  onSubmit,
  submitLabel = "Simpan",
  loading = false,
}) {
  const [form, setForm] = useState(initialData);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, gaji: Number(form.gaji) });
  };

  return (
    <form onSubmit={handleSubmit} className="card form">
      <label>
        Nama
        <input name="nama" value={form.nama} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Jabatan
        <input
          name="jabatan"
          value={form.jabatan}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Gaji
        <input
          name="gaji"
          type="number"
          min="0"
          value={form.gaji}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Menyimpan..." : submitLabel}
        </button>
        <Link href="/karyawan" className="btn">
          Batal
        </Link>
      </div>
    </form>
  );
}
