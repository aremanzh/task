import { View } from 'react-native';
import Text from "@kaloraat/react-native-text";
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function Home() {

  // context

  const [auth, setAuth] = useContext(AuthContext);

  return (
    <View>
      <Text>Welcome....</Text>
      <Text>{JSON.stringify(auth, null, 4)}</Text>
    </View>
  );
}

export default Home