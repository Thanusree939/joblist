const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= CREATE JOB ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job" });
  }
});

/* ================= GET ALL JOBS ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/* ================= GET SINGLE JOB ================= */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

/* ================= UPDATE JOB ================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to update job" });
  }
});

/* ================= DELETE JOB ================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

module.exports = router;
