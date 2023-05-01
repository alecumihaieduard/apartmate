import { useContext } from "react";
import { View, Text, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import ExpensesContext from "../context/ExpensesContext";

export default function DisplayElementScreen({ route, navigation }) {
  const expense = route.params.expense;
  const tempDate = new Date(expense.date);
  const fdate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
  const { remove_from_db } = useContext(ExpensesContext);
  
  return (
    <SafeAreaView>
      <ImageBackground
        className={"absolute h-screen w-screen"}
        source={require("../img/paper.jpg")}
      />
      <View className={"mt-20 w-[90%] self-center rounded-lg bg-black/80 py-5"}>
        <Text className={"self-center text-2xl text-white"}>{expense.title}</Text>
        <Text className={"mt-2 self-center text-base text-white"}>{expense.details}</Text>
        <Text className={"mt-2 self-center text-xl text-white"}>{expense.amount} $</Text>
        <Text className={"mt-2 self-center text-xl text-white"}>{fdate}</Text>

        <View className={"mt-5 flex-row justify-evenly"}>
          <Pressable
            className={"h-20 w-32 items-center justify-center rounded-lg bg-cyan-300 active:opacity-50"}
            onPress={() => {
              navigation.navigate("Edit", { expense: expense });
            }}
          >
            <AntDesign
              name="edit"
              size={60}
              color="white"
            />
          </Pressable>
          <Pressable
            className={"h-20 w-32 items-center justify-center rounded-lg bg-red-600 active:opacity-50"}
            onPress={() => {
              remove_from_db("expenses", expense.id);
              navigation.goBack();
            }}
          >
            <EvilIcons
              name="trash"
              size={60}
              color="white"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
