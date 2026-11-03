const express = require("express");
const {  getAllKaryawan,
  getKaryawanById,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
  getKaryawanAman,
  getKaryawanRentan
} = require("../controller/karyawan_controller");

const router = express.Router();

// GET ALL
router.get("/", getAllKaryawan);

// POST
router.post("/", createKaryawan);

// PUT
router.put("/:id", updateKaryawan);

// DELETE
router.delete("/:id", deleteKaryawan);

// GET KARYAWAN AMAN
router.get("/aman", getKaryawanAman);

// GET KARYAWAN RENTAN
router.get("/rentan", getKaryawanRentan);

// GET BY ID
router.get("/:id", getKaryawanById);


module.exports = router;