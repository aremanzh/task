import jwt from "jsonwebtoken";
import Task from "../models/Task";

const updateDelete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
}

export default updateDelete