"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createKaryawan } from "@/lib/karyawanService";
import KaryawanForm from "@/components/karyawan/KaryawanForm";
import Alert from "@/components/ui/Alert";

export default function TambahKaryawanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (body) => {
    setLoading(true);
    try {
      await createKaryawan(body);
      router.push("/karyawan");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Tambah Karyawan</h1>
      <Alert message={error} />
      <KaryawanForm
        onSubmit={handleSubmit}
        submitLabel="Tambah"
        loading={loading}
      />
    </>
  );
}
