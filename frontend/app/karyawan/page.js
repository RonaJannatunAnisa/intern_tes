"use client";

import { useEffect, useState } from "react";
import {
  getAllKaryawan,
  deleteKaryawan,
  searchKaryawanAman,
  searchKaryawanRentan,
} from "@/lib/karyawanService";
import KaryawanTable from "@/components/karyawan/KaryawanTable";
import Alert from "@/components/ui/Alert";

export default function KaryawanPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // state pencarian
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState("aman");
  const [searchResult, setSearchResult] = useState(null); // null = belum mencari
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [elapsed, setElapsed] = useState(null);

  const loadData = async () => {
    try {
      setData(await getAllKaryawan());
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus karyawan ini?")) return;
    try {
      await deleteKaryawan(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    setSearchError("");
    setSearchResult(null);
    setElapsed(null);

    const start = performance.now();
    try {
      const fn = mode === "aman" ? searchKaryawanAman : searchKaryawanRentan;
      const result = await fn(keyword);
      setSearchResult(result);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setElapsed(Math.round(performance.now() - start));
      setSearching(false);
    }
  };

  const handleReset = () => {
    setKeyword("");
    setSearchResult(null);
    setSearchError("");
    setElapsed(null);
  };

  return (
    <>
      <h1>Data Karyawan</h1>

      <h2>Cari Karyawan by Nama</h2>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Masukkan nama..."
          value={keyword}
          maxLength={100}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="aman">Aman (findMany)</option>
          <option value="rentan">Rentan (queryRawUnsafe)</option>
        </select>
        <button type="submit" disabled={searching}>
          {searching ? "Mencari..." : "Cari"}
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      {mode === "rentan" && (
        <p style={{ color: "crimson" }}>
          Mode rentan: khusus lab lokal, jangan dipakai di produksi.
        </p>
      )}

      <Alert message={searchError} />

      {elapsed !== null && (
        <p>
          Mode: <b>{mode}</b> | Waktu: <b>{elapsed} ms</b>
          {searchResult && (
            <>
              {" "}
              | Jumlah hasil: <b>{searchResult.length}</b>
            </>
          )}
        </p>
      )}

      {searchResult !== null &&
        (searchResult.length === 0 ? (
          <p>Data tidak ditemukan.</p>
        ) : (
          <KaryawanTable data={searchResult} onDelete={handleDelete} />
        ))}

      <hr style={{ margin: "24px 0" }} />

      <Alert message={error} />
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <KaryawanTable data={data} onDelete={handleDelete} />
      )}
    </>
  );
}
