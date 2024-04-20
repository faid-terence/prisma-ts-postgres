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

  async getJobById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const job = await prisma.job.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!job) {
        return res.status(404).json("Job not found");
      }
      return res.json(job);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  async updateJob(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, company, location, salary, applyLink } =
      req.body;
    try {
      const job = await prisma.job.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          description,
          company,
          location,
          salary,
          applyLink,
        },
      });
      return res.json(job);
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }

  async deleteJob(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.job.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Job deleted successfully" });
    } catch (error: any) {
      return res.status(400).json(error.message);
    }
  }
}

export default JobController;
