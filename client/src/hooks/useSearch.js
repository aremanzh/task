import { useState, useContext } from "react";
import { TaskContext } from "../context/task";

export default function useSearch() {
  const [task, setTask] = useContext(TaskContext);
  const [keyword, setKeyword] = useState("");

  const filteredTasks = task?.tasks?.filter((t) => t.task.toLowerCase().includes(keyword))

  return { keyword, setKeyword, filteredTasks }
}

