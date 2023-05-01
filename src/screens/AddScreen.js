import { View, Text, TextInput, Pressable, ImageBackground, Dimensions } from "react-native";
import { useLayoutEffect, useState, useContext, useEffect } from "react";

import { Entypo } from "@expo/vector-icons";
import ExpensesContext from "../context/ExpensesContext";
import DatePicker from "react-native-date-picker";
import { supabase } from "../api/supabase";
import { LinearGradient } from "expo-linear-gradient";

export default function AddScreen({ navigation, route }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [id, setId] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: type === "add" ? "Add Expense" : "Edit expense",
    });
  }, [navigation]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setId(data.session.user.id);
    };
    checkSession();
  });

  const type = route.params.type;

  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [details, setDetails] = useState();

  const { add_to_db, activeGroup } = useContext(ExpensesContext);

  return (
    <ImageBackground
      className={"absolute h-screen w-screen"}
      source={require("../img/paper.jpg")}
      >
      <View className={"mt-20 w-[90%] items-center self-center rounded-lg bg-black/60"}>
        <Text className={"mt-2 self-center text-xl text-white"}>Name of the expense</Text>
        <View className={"mt-2 h-12 w-[70%] rounded-lg bg-black/50 p-1"}>
          <TextInput
            className={"flex-1 text-base text-white"}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            maxLength={35}
          />
        </View>
        <Text className={"mt-2 self-center text-xl text-white"}>Details of the expense</Text>
        <View className={"mt-2 h-36 w-[80%] rounded-lg bg-black/50 p-1"}>
          <TextInput
            className={"flex-1 text-base text-white"}
            style={{ textAlignVertical: "top" }}
            value={details}
            onChangeText={(text) => {
              setDetails(text);
            }}
            maxLength={150}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View className={"w-full flex-row justify-evenly"}>
          <View>
            <Text className={"mt-2 self-center text-xl text-white"}>Amount</Text>
            <View className={"my-2 h-12 w-32 flex-row rounded-lg bg-black/50 p-1"}>
              <TextInput
                className={"mr-1 basis-2/3 text-right text-xl text-white"}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={5}
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
              <Text className={"basis-1/3 self-center text-lg text-white"}> Lei</Text>
            </View>
          </View>
          <View>
            <Text className={"mt-2 self-center text-xl text-white"}>Date</Text>
            <View className={"my-2 h-12 w-32 flex-row rounded-lg bg-black/50 p-1"}>
              <Pressable
                className={"flex-1 items-center justify-center"}
                onPress={() => setShowCalendar(true)}
              >
                <Text className={"text-lg text-white"}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          className={"mb-4 mt-1 h-12 w-36 flex-row items-center justify-center rounded-lg bg-rose-600"}
          onPress={() => {
            console.log(id);
            add_to_db("expenses", {
              title: title,
              amount: amount,
              date: date,
              details: details,
              created_by: id,
              group_id: activeGroup.id,
            });
            navigation.navigate("Recent");
          }}
        >
          <Text className={"pr-2 text-2xl text-white"}>ADD</Text>
          <Entypo
            name="add-to-list"
            size={30}
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
