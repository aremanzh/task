import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
import { TaskContext } from '../../context/task';
import { AuthContext } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

function UpdateTask() {

  // context 
  const [task, setTask] = useContext(TaskContext);
  const [auth, setAuth] = useContext(AuthContext);

  // state
  const [content, setContent] = useState("");

  // effect
  useEffect(() => {
    if (task) setContent(task?.selected?.task);
  }, [task])

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(`/task/${task?.selected?._id}`, {
        task: content,
      });
      const newList = task.tasks.map((t) => {
        if (t._id === data._id) {
          return data;
        }
        return t;
      })
      setTask((prev) => ({ ...prev, tasks: newList, selected: null }))
      toast.success("Task updated!");
    } catch (err) {
      console.log(err);
    }

  }

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.delete(`/task/${task?.selected?._id}`);
      setTask(prev => ({ ...prev, tasks: prev.tasks.filter((task) => task._id !== data._id), selected: null }))
      toast.error("Task deleted!");
    } catch (err) {
      console.log(err);
    }

  }

  const canUpdateDelete = auth?.user?._id === task?.selected?.postedBy._id;

  return (
    <>
      <Modal open={task?.selected !== null} onCancel={() => setTask({ ...task, selected: null })} footer={null}>
        <form className='d-flex justify-content p-3'>
          <textarea className='form-control m-1' maxLength="160" value={content} onChange={(e) => setContent(e.target.value)} placeholder='write something...' />
          {canUpdateDelete ? (<>
            <button onClick={handleUpdate} type='submit' className='btn btn-primary m-1'>Update</button>
            <button onClick={handleDelete} type='submit' className='btn btn-danger m-1'>Delete</button>
          </>) : (
            // <p className='text-muted'>By {task?.selected?.postedBy?.name}</p>
            <button className='btn disabled m-1'>By {task?.selected?.postedBy?.name}</button>
          )}
        </form>
      </Modal>
    </>
  )
}

export default UpdateTask