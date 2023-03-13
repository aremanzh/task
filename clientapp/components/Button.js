import { React } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from "@kaloraat/react-native-text";

function Button({ title, handleSubmit, loading, color = "#433362" }) {
  return (
    <TouchableOpacity onPress={handleSubmit} style={{
      backgroundColor: color,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    }}>
      <Text bold medium center color="#fff">{loading ? "Please wait..." : title}</Text>
    </TouchableOpacity>
  )
}

export default Button