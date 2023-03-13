import { useState, useContext } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import Text from "@kaloraat/react-native-text";
import Input from '../components/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../components/Button';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ForgotPassword({ navigation }) {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/forgot-password", {
        email,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Enter the new password and reset code we sent in your email");
        setVisible(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/reset-password", {
        email,
        password,
        resetCode,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Now you can login with your new password!");
        setLoading(false);
        navigation.navigate("Signin");
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
          <Text title bold center style={{ marginBottom: 20 }}>Forgot Password</Text>

          <Input text={"Email"} value={email} setValue={setEmail} keyboardType="email-address" />
          {visible && (
            <>
              <Input text={"Password"} value={password} setValue={setPassword} secureTextEntry={true} />
              <Input text={"Reset Code"} value={resetCode} setValue={setResetCode} />
            </>
          )}



          <Button title={visible ? "Reset Password" : "Recover"} loading={loading} handleSubmit={visible ? handlePasswordReset : handleSubmit} />

          <Text onPress={() => navigation.navigate("Signin")} small center style={{ color: "#333", marginTop: 10 }}>Sign In</Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

export default ForgotPassword