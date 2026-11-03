const prisma = require("../config/prisma");

const getAllKaryawan = async (req, res) => {
  try {
    const data = await prisma.karyawan.findMany({
      orderBy: { id: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// GET BY ID
const getKaryawanById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }

    const data = await prisma.karyawan.findUnique({
      where: { id },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Karyawan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// POST
const createKaryawan = async (req, res) => {
  try {
    const { nama, jabatan, email, gaji } = req.body;

    const data = await prisma.karyawan.create({
      data: { nama, jabatan, email, gaji },
    });

    res.status(201).json({
      success: true,
      message: "Berhasil menambahkan karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// PUT
const updateKaryawan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }
    const { nama, jabatan, email, gaji } = req.body;

    const data = await prisma.karyawan.update({
      where: { id },
      data: { nama, jabatan, email, gaji },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengubah data karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// DELETE
const deleteKaryawan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }

    const data = await prisma.karyawan.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil menghapus data karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// tes aman
const getKaryawanAman = async (req, res) => {
  try {
    const allowed = ["nama"];
    const unknown = Object.keys(req.query).filter((k) => !allowed.includes(k));
    if (unknown.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Parameter tidak dikenal",
      });
    }

    const { nama } = req.query;
    if (nama !== undefined && typeof nama !== "string") {
      return res.status(400).json({
        success: false,
        message: "Parameter nama harus berupa teks",
      });
    }

    const data = await prisma.karyawan.findMany({
      where: nama ? { nama: { contains: nama } } : undefined,
      orderBy: { id: "asc" },
    });

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data karyawan",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

//tes bahaya
const getKaryawanRentan = async (req, res) => {
  try {
    const { nama } = req.query;

    // RENTAN: input digabung langsung ke string SQL
    const sql = nama
      ? `SELECT * FROM karyawan WHERE nama LIKE '%${nama}%' ORDER BY id ASC`
      : `SELECT * FROM karyawan ORDER BY id ASC`;

    const data = await prisma.$queryRawUnsafe(sql);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data karyawan",
      data,
    });
  } catch (error) {
    // RENTAN: detail error bocor ke client
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
  getKaryawanAman,
  getKaryawanRentan,
};
