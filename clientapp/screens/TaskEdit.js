import { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import Text from "@kaloraat/react-native-text";
import Input from '../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { TaskContext } from '../context/task';

export default function TaskEdit({ navigation }) {
  // context
  const [task, setTask] = useContext(TaskContext);

  //state
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (task) setContent(task?.selected?.task);
  }, [task]);

  const handleSubmit = async () => {
    if (!content) {
      alert("Please write something")
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(`/task/${task?.selected?._id}`, {
        task: content,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {

        const newList = task.tasks.map((t) => {
          if (t._id == data._id) {
            return data;
          }
          return t;
        })

        setTask({ ...task, tasks: newList });
        alert("Task updated!");
        setContent("");
        setLoading(false);
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    try {
      const { data } = await axios.delete(`/task/${task?.selected?._id}`);
      setTask({ ...task, tasks: task.tasks.filter((t) => t._id !== data._id) });
      alert("Deleted!");
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }


  return (

    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text title bold center style={{ marginBottom: 20 }}>Edit Task</Text>
        <Input text={"Make some changes..."} value={content} setValue={setContent} color="#333" />
        <Button title={"Update now"} loading={loading} handleSubmit={handleSubmit} />
        <Text style={{ marginVertical: 10 }}></Text>
        <Button title={"Delete now"} loading={loading} handleSubmit={handleDelete} color="#900" />
      </View>
    </KeyboardAwareScrollView>

  )
}