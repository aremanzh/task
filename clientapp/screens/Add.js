import { useState, useContext } from 'react';
import { View } from 'react-native';
import Text from "@kaloraat/react-native-text";
import Input from '../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { TaskContext } from '../context/task';

export default function Add({ navigation }) {
  // context
  const [task, setTask] = useContext(TaskContext);

  //state
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/task", {
        content,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        setTask({ ...task, tasks: [data, ...task.tasks] });
        alert("Task created successfully");
        setContent("");
        setLoading(false);
        navigation.navigate("Tasks");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  return (

    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text title bold center style={{ marginBottom: 20 }}>New Task</Text>
        <Input text={"Write something..."} value={content} setValue={setContent} color="#333" />
        <Button title={"Add now"} loading={loading} handleSubmit={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>

  )
}