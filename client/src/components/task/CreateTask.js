import { useState, useContext } from 'react'
import { TaskContext } from "../../context/task";
import axios from 'axios'
import socket from '../../socket';

function CreateTask() {

  // console.log("socket client => ", socket);

  // state
  const [content, setContent] = useState("");
  const [task, setTask] = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/task", { content });
      setTask({ ...task, tasks: [data, ...task.tasks] });
      setContent("");

      // emit socket event
      socket.emit("new-task", data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12 col-lg-10 offset-lg-1">
            <form className='d-flex justify-content' onSubmit={handleSubmit}>
              <textarea className='form-control m-1' maxLength="160" value={content} onChange={(e) => setContent(e.target.value)} placeholder='write something...' />
              <button type='submit' className='btn btn-warning m-1'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTask