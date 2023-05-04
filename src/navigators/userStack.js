import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ExpensesProvider } from "../context/ExpensesContext";
import RecentScreen from "../screens/RecentScreen";
import AddScreen from "../screens/AddScreen";
import EditScreen from "../screens/EditScreen";
import SelectGroupScreen from "../screens/SelectGroupScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import DisplayElementScreen from "../screens/DisplayElementScreen";
import { supabase } from "../api/supabase";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useContext } from "react";
import ExpensesContext from "../context/ExpensesContext";
import NoGroupScreen from "../screens/NoGroupScreen";
import ActiveGroupScreen from "../screens/ActiveGroupScreen";
import ScanScreen from "../screens/ScanScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { activeGroup } = useContext(ExpensesContext);

  const SignOutComponent = () => {
    supabase.auth.signOut();
    return null;
  };
  return (
    <BottomTab.Navigator
      // sceneContainerStyle={{ backgroundColor: "rgb(249, 249, 249)" }}
      screenOptions={{
        headerTitleStyle: { color: "black" },
        headerShown: false,
        tabBarActiveTintColor: "rgb(255, 165, 0)",
        tabBarInactiveTintColor: "rgb(135, 135, 135)",
        tabBarStyle: { backgroundColor: "rgb(0, 0, 0)", borderTopColor: "black", height: 60 },
        tabBarLabelStyle: { fontSize: 14 },
      }}
      initialRouteName="Groups"
    >
      <BottomTab.Screen
        name="Groups"
        component={activeGroup !== null ? ActiveGroupScreen : SelectGroupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="team"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Groups",
          headerTitle: "Groups",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTitleStyle: { color: "white", fontSize: 22 },
        }}
      />

      <BottomTab.Screen
        name="Recent"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="profile"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Expenses",
          headerTitle: "",
          headerTransparent: true,
          headerTitleStyle: { color: "white" },
        }}
      >
          {(props) => 
            {
              if (activeGroup !== null) {
                return <RecentScreen  {...props}/>
              }
              else {
                return <NoGroupScreen  {...props} message="No active Group"/>
              }
            }
          }
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Scan"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="camera"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Scan",
          headerTitle: "",
          headerTransparent: true,
          headerTitleStyle: { color: "white" },
        }}
      >
        {(props) => 
            {
              if (activeGroup !== null) {
                return <ScanScreen  {...props}/>
              }
              else {
                return <NoGroupScreen  {...props} message="No active Group"/>
              }
            }
          }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Sign out"
        component={SignOutComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="log-out"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Sign out",
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function UserStack() {
  return (
    <ExpensesProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Bottom"
          screenOptions={{
            headerTintColor: "black",
            cardStyle: { backgroundColor: "rgb(255, 255, 255)" },
          }}
        >
          <Stack.Screen
            name="Bottom"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{
              headerTransparent: true,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{
              headerTransparent: true,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Display"
            component={DisplayElementScreen}
            options={{
              headerTransparent: true,
              headerTitleAlign: "center",
              title: ""
            }}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroupScreen}
            options={{
              headerTransparent: true,
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}
