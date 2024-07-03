import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router
    .route('/')
    .get(usersController.getUsers)
    .post(usersController.createUsers);

router.route('/:id').
    get(usersController.getUser).
    put(usersController.updateUser).
    delete(usersController.deleteUser).
    patch(usersController.activateInactive);

export default router;