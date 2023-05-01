import { View, Text, TextInput, Pressable, ImageBackground } from "react-native";
import { useState, useContext } from "react";
import DatePicker from "react-native-date-picker";
import ExpensesContext from "../context/ExpensesContext";
import { AntDesign } from "@expo/vector-icons";

export default function EditScreen({ navigation, route }) {
  const expense = route.params.expense;
  const [date, setDate] = useState(new Date(expense.date));
  const [showCalendar, setShowCalendar] = useState(false);
  let fDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [details, setDetails] = useState(expense.details);
  const { edit_from_db } = useContext(ExpensesContext);

  return (
    <ImageBackground
      className={"absolute h-screen w-screen"}
      source={require("../img/paper.jpg")}
      >
      <View className={"mt-20 w-[90%] items-center self-center rounded-lg bg-black/50 py-4"}>
        <Text className={"self-center text-xl text-white"}>Name of the expense</Text>
        <TextInput
          className={"mt-2 h-12 w-[70%] rounded-lg bg-black/50 p-1 text-base text-white"}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          maxLength={35}
        />
        <Text className={"mt-2 self-center text-xl text-white"}>Details of the expense</Text>
        <TextInput
          className={"mt-2 h-36 w-[80%] rounded-lg bg-black/50 p-1 text-base text-white"}
          style={{ textAlignVertical: "top" }}
          value={details}
          onChangeText={(text) => {
            setDetails(text);
          }}
          maxLength={150}
          multiline={true}
          numberOfLines={4}
        />
        <View className={"w-full flex-row justify-evenly "}>
          <View className={"flex-1 items-center"}>
            <Text className={"mt-2 text-xl text-white"}>Amount</Text>
            <View className={"mt-2 h-12 w-[80%] flex-row items-center justify-center rounded-lg bg-black/50 p-1"}>
              <TextInput
                className={"w-[70%] text-right text-2xl text-white"}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={5}
                value={amount}
                onChangeText={(text) => {
                  console.log(typeof text);
                  setAmount(text);
                }}
              />
              <Text className={"w-[30%] text-center text-xl text-white"}>Lei</Text>
            </View>
          </View>
          <View className={"flex-1 items-center"}>
            <Text className={"mt-2 text-xl text-white"}>Date</Text>
            <Pressable
              className={"mt-2 h-12 w-32 justify-center rounded-lg bg-black/50 p-1"}
              onPress={() => setShowCalendar(true)}
            >
              <Text className={"text-center text-lg text-white"}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          className={"mt-3 h-12 w-36 flex-row items-center justify-center rounded-lg bg-green-600"}
          onPress={() => {
            edit_from_db("expenses", expense.id, {
              title: title,
              amount: amount,
              date: date,
              details: details,
            });
            navigation.navigate("Recent");
          }}
        >
          <Text className={"mr-2 text-2xl text-white"}>Edit</Text>
          <AntDesign
            name="edit"
            size={28}
            color="white"
          />
        </Pressable>
        <DatePicker
          modal
          open={showCalendar}
          date={date}
          onConfirm={(date) => {
            setShowCalendar(false);
            setDate(date);
          }}
          onCancel={() => {
            setShowCalendar(false);
          }}
          mode="date"
          title={null}
          theme="light"
          androidVariant="iosClone"
          fadeToColor="none"
          locale="ro"
          is24hourSource="locale"
        />
      </View>
    </ImageBackground>
  );
}
