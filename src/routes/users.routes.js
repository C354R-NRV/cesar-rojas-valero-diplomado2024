import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router(); 

router.route('/').get(usersController.getUsers).post(usersController.createUsers);

export default router;