import Text from "@kaloraat/react-native-text";
import { useContext } from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { AuthContext } from "../context/auth";
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../context/task";
import useSearch from "../hooks/useSearch";


export default function TaskList({ tasks, loading }) {

  // context 
  const [auth, setAuth] = useContext(AuthContext);
  const [task, setTask] = useContext(TaskContext);

  // hooks
  const navigation = useNavigation();
  const { keyword, setKeyword, filteredTasks } = useSearch(tasks);

  const owner = (item) => auth?.user?._id === item?.postedBy?._id;

  const handlePress = (item) => {
    if (!owner(item)) return alert("You are not allowed to edit this task!");
    setTask({ ...task, selected: item });
    navigation.navigate("TaskEdit");
  }

  return (
    <>
      <TextInput style={{
        height: 40,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#d9d9d9",
        backgroundColor: "#e6e6e6"
      }} value={keyword} onChangeText={(text) => setKeyword(text)} placeholder="Search" autoCapitalize="none" />

      <MasonryList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={{
              backgroundColor: owner(item) ? "#2F4F4F" : "#E9967A",
              margin: 10,
              paddingTop: 50,
              paddingBottom: 50,
              paddingHorizontal: 20,
              borderRadius: 25,
            }}>
            <Text color={owner(item) ? "#fff" : "#2F4F4F"} center>{item?.task}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
}