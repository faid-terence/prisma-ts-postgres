import express from "express";
import JobController from "../controllers/jobController";

const router = express.Router();

const jobController = new JobController();

router.post("/create", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);



// comment 1

// comment 2

// comment 3

export default router;
