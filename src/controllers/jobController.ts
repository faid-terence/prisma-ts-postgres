import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class JobController {
  async createJob(req: Request, res: Response) {
    const { title, description, company, location, salary, applyLink } =
      req.body;
    try {
      const job = await prisma.job.create({
        data: {
          title,
          description,
          company,
          location,
          salary,
          applyLink,
        },
      });
      return res.status(201).json(job);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  async getJobs(req: Request, res: Response) {
    try {
      const jobs = await prisma.job.findMany();
      return res.json(jobs);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default JobController;
