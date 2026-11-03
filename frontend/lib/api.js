const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function request(path = "", options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Gagal terhubung ke server. Pastikan backend sudah jalan.");
  }

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new Error(json?.message || "Terjadi kesalahan");
  }
  return json;
}
