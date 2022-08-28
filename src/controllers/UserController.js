import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const UserController = {
  async add(req, res) {
    try {
      const { name, email, password } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "Já existe um usuário com esse email" });
      }

      var hash = await bcrypt.hash(password, 8);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash
        },
      });

      return res.json(user);
    } catch (error) {}
  },

  async get(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      return res.json({ error });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({
          error: `Não foi possível localizar o usuário ${id}`,
        });
      }

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({
          error: `Não foi possível localizar o usuário ${id}`,
        });
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({
          error: `Não foi possível localizar o usuário ${id}`,
        });
      }

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
};
