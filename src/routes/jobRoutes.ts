import express from "express";
import JobController from "../controllers/jobController";

const router = express.Router();

const jobController = new JobController();

router.post("/create", jobController.createJob);
router.get("/", jobController.getJobs);

export default router;
