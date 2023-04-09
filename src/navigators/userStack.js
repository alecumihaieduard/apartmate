import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {ExpensesProvider} from "../context/ExpensesContext"
import RecentScreen from "../screens/RecentScreen";
import AddScreen from "../screens/AddScreen";
import EditScreen from "../screens/EditScreen";
import AllScreen from "../screens/AllScreen";
import DisplayElementScreen from "../screens/DisplayElementScreen";
import { supabase } from "../api/supabase";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const SignOutComponent = () => {
    supabase.auth.signOut()
    return null
  }
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "rgb(249, 249, 249)" }}
      screenOptions={{
        headerTitleStyle: { color: "white" },

        tabBarActiveTintColor: "rgb(0, 0, 0)",
        tabBarInactiveTintColor: "rgb(136, 136, 136)",
        tabBarStyle: { backgroundColor: "rgb(222, 221, 217)", height: 60},
        tabBarLabelStyle:{fontSize:15},
      }}
      initialRouteName="Recent"
    >
      <BottomTab.Screen
        name="Recent"
        component={RecentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-timer" size={28} color={color} />
          ),
          tabBarLabel: "Recent",
          headerTitle: "Recent Expenses",
          headerTransparent:true,
          headerTitleAlign:"center",
          headerTitleStyle:{color:"black"}

        }}
      />
      {/* <BottomTab.Screen
        name="All"
        component={AllScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={28} color={color} />
          ),
          tabBarLabel: "All Expenses",
          headerTitle: "All Expenses",
          headerTitleAlign:"center",
          headerTransparent:true,
          headerTitleStyle:{color:"black"}
        }}
      /> */}
      <BottomTab.Screen 
        name="Sign out"  
        component={SignOutComponent}
        options={{
          tabBarIcon: ({color,size}) => (
            <Entypo name="log-out" size={28} color={color} />          ),
            tabBarLabel: "Sign out",
            
    }}/>
    </BottomTab.Navigator>
  );
};


export default function UserStack() {

    return (
      <ExpensesProvider>
  
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Bottom"
            screenOptions={{
              headerTintColor: "white",
              cardStyle: { backgroundColor: "rgb(255, 255, 255)" },
            }}
          >
            <Stack.Screen
              name="Bottom"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Add" component={AddScreen} options={{headerTransparent:true,headerTintColor:"black",headerTitleAlign:"center"}} />
            <Stack.Screen name="Edit" component={EditScreen} options={{headerTransparent:true,headerTintColor:"black",headerTitleAlign:"center"}}/>
            <Stack.Screen name="Display" component={DisplayElementScreen} options={{headerTransparent:true,headerTintColor:"black",headerTitleAlign:"center"}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    );
  }