
import express from "express";

const router = express.Router();

// Middlewares
import requireSignIn from "../middlewares";
import updateDelete from "../middlewares/updateDelete";

// controllers
const { create, tasks, update, remove, taskCount } = require("../controllers/task");

router.post("/task", requireSignIn, create);
router.get("/tasks/:page", tasks);
router.put("/task/:taskId", requireSignIn, updateDelete, update);
router.delete("/task/:taskId", requireSignIn, updateDelete, remove);
router.get("/task-count", taskCount);


export default router;
