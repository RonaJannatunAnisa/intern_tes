require("dotenv").config();
const express = require("express");
const cors = require("cors");
const karyawanRoutes = require("./routes/karyawan_routes");

const app = express();
app.use(cors()); //akses untuk masuk ke origin mana aja yang diperbolehkan
app.use(express.json()); //agar dpt membaca format json

app.use("/api/karyawan", karyawanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
