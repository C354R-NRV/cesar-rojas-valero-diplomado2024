import { Router } from "express";
import tasksController from "../controllers/tasks.controller.js";


const router = Router();

router.route('/').get(tasksController.getTasks).post(tasksController.createTasks);

export default router;