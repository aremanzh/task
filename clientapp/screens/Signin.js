import { useState, useContext } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import Text from "@kaloraat/react-native-text";
import Input from '../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signin({ navigation }) {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/signin", {
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
        alert("Login successful");
        setLoading(false);
        navigation.navigate("Home", { user: { id: data.user._id, name: data.user.name } });

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
          <Text title bold center style={{ marginBottom: 20 }}>Login</Text>

          <Input text={"Email"} value={email} setValue={setEmail} autoCompleteType="email" keyboardType="email-address" color="#333" />
          <Input text={"Password"} value={password} setValue={setPassword} secureTextEntry={true} autoCompleteType="password" color="#333" />

          <Button title={"Login"} loading={loading} handleSubmit={handleSubmit} />

          <Text small center style={{ color: "#333", marginTop: 10 }}>Don't have an account? {" "}<Text onPress={() => navigation.navigate("Signup")} style={{ color: "#333" }}>Register</Text></Text>
          <Text onPress={() => navigation.navigate("ForgotPassword")} small center style={{ color: "#333", marginTop: 10 }}>Forgot Password</Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

export default Signin