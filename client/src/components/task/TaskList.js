import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/task";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import useSearch from "../../hooks/useSearch";
import Timer from "./Timer";
import SearchBar from "../forms/SearchBar";
import Masonry from 'react-masonry-css';

dayjs.extend(relativeTime);

export default function TaskList() {
  // context 
  const [task, setTask] = useContext(TaskContext);
  const [auth, setAuth] = useContext(AuthContext);

  // state
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // hooks
  const { keyword, setKeyword, filteredTasks } = useSearch();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1
  };

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadTasks();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/task-count");
      setTotal(data)
    } catch (err) {
      console.log(err);
    }
  }

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks/${page}`);
      setTask((prev) => ({ ...prev, tasks: [...prev.tasks, ...data] }));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const handleClick = (item) => {
    setTask({ ...task, selected: item });
  };

  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-12 col-lg-10 offset-lg-1">

          <SearchBar keyword={keyword} setKeyword={setKeyword} />

          <pre className="text-center" style={{ textDecoration: "underline red", textDecorationThickness: "3px" }}>{task?.tasks.length} tasks</pre>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {filteredTasks.map((task) => (<div key={task._id} style={{
              background: auth?.user?._id === task?.postedBy?._id ? "#f2ffe6" : "#ffe6e6",
            }} className="rounded shadow p-2 m-2 tasklist" onClick={() => handleClick(task)}>
              <p>{task.task}</p>
              <p className="float-end" style={{ fontSize: "12px", marginTop: "-15px" }}>
                {/* {dayjs(task.createdAt).fromNow()} */}
                <Timer time={task.createdAt} /> by <b>{task?.postedBy?.name}</b></p>
            </div>))}
          </Masonry>

          {task?.tasks?.length < total && (
            <div className="text-center mt-4 mb-4">
              <button disabled={loading} className="btn btn-outline-warning" onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>Load more</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}