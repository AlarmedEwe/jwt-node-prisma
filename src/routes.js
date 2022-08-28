import { Router } from "express";
import { UserController } from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import authMiddleware from "./middlewares/auth";

const router = Router();

router.post("/login", SessionController.login);

router.use(authMiddleware);
router.post("/user", UserController.add);
router.get("/user", UserController.get);
router.get("/user/:id", UserController.getById);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove);

export { router };
