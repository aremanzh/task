import { useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context/auth';
import Feather from 'react-native-vector-icons/Feather';

import Signup from './screens/Signup';
import Signin from './screens/Signin';
import ForgotPassword from './screens/ForgotPassword';
import Add from './screens/Add';
import Tasks from './screens/Tasks';
// import Home from './screens/Home';
import TaskEdit from './screens/TaskEdit';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppRoutes() {

  // context
  const [auth, setAuth] = useContext(AuthContext);
  const authenticated = auth?.token !== "" && auth?.user !== null;


  const logout = async () => {
    setAuth({ user: null, token: "" });
    await AsyncStorage.removeItem("@auth");
  }

  const Home = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 80 },
          headerRight: () => (
            <Feather name='log-out' onPress={logout} size={20} style={{ marginHorizontal: 10 }} />
          )
        }}>
        <Tab.Screen name='Tasks' component={Tasks} options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#433362" : color }}>Tasks</Text>
          ), tabBarIcon: ({ focused, color, size }) => (
            <Feather name={focused ? "database" : "minimize"} size={size} color={focused ? "#433362" : color} />
          )
        }} />
        <Tab.Screen name='Add' component={Add} options={{
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{ color: focused ? "#433362" : color }}>Add</Text>
          ), tabBarIcon: ({ focused, color, size }) => (
            <Feather name={focused ? "file-plus" : "minimize"} size={size} color={focused ? "#433362" : color} />
          )
        }} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Signin'>
        {authenticated ? (
          <>
            <Stack.Screen name='Home' component={Home} options={{
              //headerTitle: "Tasker",
              headerShown: false,
              headerRight: () => (
                // <Button title='Logout' onPress={logout} color="#333" />
                <Feather name='log-out' onPress={logout} size={20} />
              )
            }} />
            <Tab.Screen name='TaskEdit' component={TaskEdit} options={{ title: "Task Edit" }} />
          </>
        ) : (
          <>
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false, }} />
            <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false, }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ headerShown: false, }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return <WebView source={{ uri: "https://mumtaaz.xyz/" }} style={{ marginTop: 50 }} />;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
