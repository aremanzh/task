import { TextInput } from 'react-native';
import Text from "@kaloraat/react-native-text";

export default function Input({
  text,
  value,
  setValue,
  autoCapitalize = "none",
  autoCorrect = false,
  keyboardType = "default",
  color = "#fff",
  secureTextEntry = false,
  autoCompleteType = "",
  multiline = false,
}) {
  return (
    <>
      <Text color={color}>{text}</Text>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        autoCompleteType={autoCompleteType}
        style={{
          borderBottomWidth: 0.5,
          height: 48,
          borderBottomColor: '#8e93a1',
          marginTop: -5,
          marginBottom: 20,
          color,
        }}


      />
    </>
  )
}