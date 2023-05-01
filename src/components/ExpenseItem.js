import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";

export default function ExpenseItem({ expense }) {
  const navigation = useNavigation();
  let tempDate = new Date(expense.date);
  const fdate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();

  return (
    <Pressable
      className={"my-1 h-20 w-[90%] self-center rounded-lg bg-black/70 p-2 active:opacity-50"}
      onPress={() => navigation.navigate("Display", { expense })}
    >
      <View className={"h-10 flex-row items-center justify-between"}>
        <Text className={"w-[65%] text-lg font-bold text-white"}>{expense.title}</Text>
        <Text className={"w-[35%] text-right text-2xl font-bold text-white"}>{expense.amount} Lei</Text>
      </View>
      <Text className={"text-sm text-white"}>{fdate}</Text>
    </Pressable>
  );
}
