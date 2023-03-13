import { useState, useContext } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import Text from "@kaloraat/react-native-text";
import Input from '../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signup({ navigation }) {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setLoading(true);
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // console.log("REGISTER RES => ", data);

        setAuth(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        alert("Registration successful");
        setLoading(false);
        navigation.navigate("Home");

      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  return (
    <ImageBackground resizeMode='cover' style={{ flex: 1, width: "100%" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
          <Image source={require('../assets/icon.png')} style={{ width: 68, height: 68 }} />
          <Text title bold center style={{ marginBottom: 20 }}>Register</Text>

          <Input text={"Name"} value={name} setValue={setName} autoCapitalize="words" color="#333" />
          <Input text={"Email"} value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address" color="#333" />
          <Input text={"Password"} value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" color="#333" />
          <Input text={"Confirm Password"} value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} autoCompleteType="password" color="#333" />

          <Button title={"Register"} loading={loading} handleSubmit={handleSubmit} />

          <Text small center style={{ color: "#333", marginTop: 10 }}>Already have an account? {" "}<Text onPress={() => navigation.navigate("Signin")} style={{ color: "#333" }}>Login</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

export default Signup