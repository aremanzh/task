import { View, Text } from "react-native";

export default function Welcome({ name }) {
  return (
    <View>
      <Text>Welcome {name}</Text>
    </View>
  );
}