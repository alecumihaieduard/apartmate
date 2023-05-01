import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTintColor: "black",
          cardStyle: { backgroundColor: "rgb(255, 255, 255)" },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerTitle: "",
            headerTitleAlign: "center",
            headerTransparent: true,
            headerTitleStyle:{color:"white",fontWeight:"bold"}
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: "",
            headerTitleAlign: "center",
            headerTransparent: true,
            headerTitleStyle:{color:"white",fontWeight:"bold"}

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
