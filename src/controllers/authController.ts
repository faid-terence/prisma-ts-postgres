import { PrismaClient } from "@prisma/client";
import e, { Request, Response } from "express";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

class AuthController {
  async register(req: Request, res: Response) {
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
  }
}



export default AuthController;