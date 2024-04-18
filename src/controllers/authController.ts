import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

const prisma = new PrismaClient();

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const userExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user);
      return res.status(200).json({ message: "Login successful", token });
    } catch (error:any) {
      return res.status(400).json(error.message);
    }
  }
}

export default AuthController;
