import { View, ImageBackground, FlatList, Text } from "react-native";
import { useEffect, useState, useContext } from "react";
import ExpenseItem from "../components/ExpenseItem";
import { Pressable } from "react-native";
import DatePicker from "react-native-date-picker";
import { supabase } from "../api/supabase";
import Spinner from "react-native-loading-spinner-overlay/lib";
import ExpensesContext from "../context/ExpensesContext";
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllScreen({ navigation }) {

  const [visibleDateFrom, setVisibleDateFrom] = useState(false);
  const [visibleDateTo, setVisibleDateTo] = useState(false);

  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { activeGroup,dateFrom,dateTo,setDateFrom,setDateTo } = useContext(ExpensesContext);

  useEffect(() => {
    updateExpenses(dateFrom, dateTo);
    const channel = supabase
      .channel("schema-expenses-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "expenses",
        },
        (payload) => {
          updateExpenses(dateFrom, dateTo);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateExpenses = async (dateF, dateT) => {
    setLoading(true);

    const { data } = await supabase.from("expenses").select().gte("date", dateF.toISOString()).lte("date", dateT.toISOString()).eq("group_id", activeGroup.id).order("date", { ascending: true });
    setExpenses(data);
    setLoading(false);
  };

  return (
    <>
      <ImageBackground
        className={"absolute h-screen w-screen"}
        source={require("../img/paper.jpg")}
        />
      <SafeAreaView className={"mb-2 mt-5 px-3"}>
        <Pressable
          className={"justfy-center h-12 w-32 flex-row rounded-lg bg-black/80 p-2 active:opacity-50"}
          onPress={() => {
            setShowFilter((oldState) => {
              return !oldState;
            });
          }}
        >
          <AntDesign
            name="filter"
            size={24}
            color="white"
          />
          <Text className={"ml-3 text-xl text-white"}>Filter</Text>
        </Pressable>
      </SafeAreaView>
      {showFilter ? (
        <View className={"mb-2 h-24 w-[95%] self-center rounded-lg"}>
          <View className={"basis-1/2 flex-row items-center justify-center"}>
            <View className={"mr-5 h-10 w-32 justify-center rounded-lg bg-orange-400 px-1"}>
              <Text className={"text-center text-xl font-bold text-white"}>From date:</Text>
            </View>
            <Pressable
              className={"mr-5 h-10 w-32 justify-center rounded-lg bg-gray-800 px-1 opacity-80"}
              onPress={() => setVisibleDateFrom(true)}
            >
              <Text className={"text-center text-xl font-bold text-white"}>{dateFrom.getDate() + "/" + (dateFrom.getMonth() + 1) + "/" + dateFrom.getFullYear()}</Text>
            </Pressable>
          </View>
          <View className={"basis-1/2 flex-row items-center justify-center"}>
            <View className={"mr-5 h-10 w-32 justify-center rounded-lg bg-yellow-600 px-1"}>
              <Text className={"text-center text-xl font-bold text-white"}>To date:</Text>
            </View>
            <Pressable
              className={"mr-5 h-10 w-32 justify-center rounded-lg bg-gray-800 px-1 opacity-80"}
              onPress={() => setVisibleDateTo(true)}
            >
              <Text className={"text-center text-xl font-bold text-white"}>{dateTo.getDate() + "/" + (dateTo.getMonth() + 1) + "/" + dateTo.getFullYear()}</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
      <FlatList
        scrollEnabled={true}
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ExpenseItem
              key={item.id}
              expense={item}
            />
          );
        }}
      />
      <Pressable
        onPress={() => navigation.navigate("Add", { type: "add" })}
        className={"absolute bottom-3 right-3 h-16 w-16 items-center justify-center rounded-full bg-black active:opacity-90"}
      >
        <MaterialIcons name="playlist-add" size={40} color="orange" />
      </Pressable>
      <DatePicker
        modal
        open={visibleDateFrom}
        date={dateFrom}
        onConfirm={(date) => {
          setVisibleDateFrom(false);
          setDateFrom(new Date(date.setHours(0, 0, 0, 0)));
          updateExpenses(new Date(date.setHours(0, 0, 0, 0)), dateTo);
        }}
        onCancel={() => {
          setVisibleDateFrom(false);
        }}
        mode="date"
        title={null}
        theme="light"
        androidVariant="iosClone"
        fadeToColor="none"
        locale="en"
        is24hourSource="locale"
      />
      <DatePicker
        modal
        open={visibleDateTo}
        date={dateTo}
        onConfirm={(date) => {
          setVisibleDateTo(false);
          setDateTo(new Date(date.setHours(23, 59, 59, 59)));
          updateExpenses(dateFrom, new Date(date.setHours(23, 59, 59, 59)));
        }}
        onCancel={() => {
          setVisibleDateTo(false);
        }}
        mode="date"
        title={null}
        theme="light"
        androidVariant="iosClone"
        fadeToColor="none"
        locale="en"
        is24hourSource="locale"
      />
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    </>
  );
}
