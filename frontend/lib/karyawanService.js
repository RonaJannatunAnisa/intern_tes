import { request } from "./api";

export const getAllKaryawan = async () => (await request("/karyawan")).data;

// pencarian by nama
export const searchKaryawanAman = async (nama) =>
  (await request(`/karyawan/aman?nama=${encodeURIComponent(nama)}`)).data;

// khusus lab, jangan dipakai di produksi
export const searchKaryawanRentan = async (nama) =>
  (await request(`/karyawan/rentan?nama=${encodeURIComponent(nama)}`)).data;

export const getKaryawanById = async (id) =>
  (await request(`/karyawan/${id}`)).data;

export const createKaryawan = (body) =>
  request("/karyawan", { method: "POST", body: JSON.stringify(body) });

export const updateKaryawan = (id, body) =>
  request(`/karyawan/${id}`, { method: "PUT", body: JSON.stringify(body) });

export const deleteKaryawan = (id) =>
  request(`/karyawan/${id}`, { method: "DELETE" });
