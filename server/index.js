
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { DATABASE } from "./config";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";

const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  path: "/socket.io",
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }
});

// db connection
mongoose.set("strictQuery", false); // required for version 6
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// socket
io.on("connect", (socket) => {
  // console.log("Socket connection => ", socket.id);
  socket.on("new-task", (task) => {
    // console.log("got new task event => ", task);
    socket.broadcast.emit("new-task", task);
  })
})

http.listen(8000, () => console.log("Server running on port 8000"));
