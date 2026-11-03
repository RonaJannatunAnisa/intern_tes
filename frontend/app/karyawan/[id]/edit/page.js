"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getKaryawanById, updateKaryawan } from "@/lib/karyawanService";
import KaryawanForm from "@/components/karyawan/KaryawanForm";
import Alert from "@/components/ui/Alert";

export default function EditKaryawanPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getKaryawanById(id)
      .then((k) =>
        setInitialData({
          nama: k.nama,
          email: k.email,
          jabatan: k.jabatan,
          gaji: String(k.gaji),
        })
      )
      .catch((err) => setError(err.message));
  }, [id]);

  const handleSubmit = async (body) => {
    setLoading(true);
    try {
      await updateKaryawan(id, body);
      router.push("/karyawan");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Edit Karyawan</h1>
      <Alert message={error} />
      {initialData && (
        <KaryawanForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Simpan Perubahan"
          loading={loading}
        />
      )}
    </>
  );
}
