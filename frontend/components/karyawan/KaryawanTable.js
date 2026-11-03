import Link from "next/link";

export default function KaryawanTable({ data, onDelete }) {
  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Jabatan</th>
            <th>Gaji</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty">
                Belum ada data karyawan
              </td>
            </tr>
          ) : (
            data.map((k, index) => (
              <tr key={k.id}>
                <td>{index + 1}</td>
                <td>{k.nama}</td>
                <td>{k.email}</td>
                <td>{k.jabatan}</td>
                <td>Rp {Number(k.gaji).toLocaleString("id-ID")}</td>
                <td className="actions">
                  <Link href={`/karyawan/${k.id}/edit`} className="btn btn-sm">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(k.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
