import { useContext, useEffect, useState } from "react";
import Text from "@kaloraat/react-native-text";
import { TaskContext } from "../context/task";
import axios from "axios";
import { ScrollView, View, Image } from "react-native";
import Button from "../components/Button";
import TaskList from "../components/TaskList";

export default function Tasks() {
  // context 
  const [task, setTask] = useContext(TaskContext);

  // state
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Effect
  useEffect(() => {
    loadTask();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])

  const loadTask = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks/${page}`);
      setTask({ ...task, tasks: data });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/task-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/tasks/${page}`);
      setTask({ ...task, tasks: [...task.tasks, ...data] });

      // delay the loading state
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  if (loading) {
    return <View style={{
      alignItems: "center",
      backgroundColor: "#fff",
      height: "100%",
      justifyContent: "center",
    }}>
      <Image source={require("../assets/loading.gif")} style={{ height: 200, width: 200 }} />
    </View>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <TaskList tasks={task?.tasks} loading={loading} />

      <View style={{ margin: 10 }}>
        <Button title={"Load more"} disabled={loading} handleSubmit={() => {
          setPage(page + 1)
        }} />
      </View>
    </ScrollView>
  );
}