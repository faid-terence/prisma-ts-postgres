import jwt from "jsonwebtoken";
import { User } from "../Interfaces";

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};
