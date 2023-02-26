
import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: Array,
      url: "",
    },
    tags: {
      type: String,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
