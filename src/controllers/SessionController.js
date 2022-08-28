import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authConfig from "../config/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.json({ error: "Password invalid" });
    }

    const { id } = user;
    return res.status(200).json({
      user: { id, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
