import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata = {
  title: "Manajemen Karyawan",
  description: "Aplikasi CRUD karyawan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
