import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/karyawan" className="brand">
          Manajemen Karyawan
        </Link>
        <Link href="/karyawan/tambah" className="btn btn-primary">
          + Tambah
        </Link>
      </div>
    </nav>
  );
}
