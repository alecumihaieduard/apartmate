import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Text
} from "react-native";
import { useLayoutEffect, useEffect, useState } from "react";
import AddNavButton from "../components/AddNavButton";
import ExpenseItem from "../components/ExpenseItem";
import { Pressable } from "react-native";
import DatePicker from "react-native-date-picker";
import { supabase } from "../api/supabase";

export default function AllScreen({ navigation }) {

  const [dateFrom,setDateFrom] = useState(new Date("2020-01-01"))
  const [dateTo,setDateTo] = useState(new Date(new Date().setHours(23,59,59,59)))
  const [visibleDateFrom,setVisibleDateFrom] = useState(false)
  const [visibleDateTo,setVisibleDateTo] = useState(false)

  const [expenses,setExpenses] = useState()

  useEffect(() => {
      updateExpenses(dateFrom,dateTo)
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'expenses'
          },
          (payload) => {
            updateExpenses(dateFrom,dateTo)
            
          }
        )
        .subscribe()
      return () => {supabase.removeChannel(channel)}
  }, []);

  const updateExpenses = async (dateF,dateT) => {

    const {data} = await supabase
      .from("expenses")
      .select()
      .gte("date",dateF.toISOString())
      .lte("date",dateT.toISOString())
      .order('date',{ascending:true})
    setExpenses(data)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <AddNavButton />;
      },
    });
  }, [navigation]);

  return (
    <>
      <ImageBackground
        source={require("../img/background2.png")}
        style={styles.container}
      />
      <View style={{ flex: 1, marginTop: 80 }}>
        <View style={styles.filterContainer}>
          <View style={[styles.filterRow,]}>
            <View style={[styles.filterForm,{backgroundColor:"rgb(224, 131, 33)"}]}>
              <Text style={[styles.filterText]}>From date:</Text>
            </View>
            <Pressable style={styles.filterForm} onPress={() => setVisibleDateFrom(true)} >
              <Text style={styles.filterText}>{dateFrom.getDate()+"/"+(dateFrom.getMonth()+1)+"/"+dateFrom.getFullYear()}</Text>
            </Pressable>
          </View>
          <View style={[styles.filterRow]}>
          <View style={[styles.filterForm,{backgroundColor:"rgb(225, 168, 23)"}]}>
              <Text style={[styles.filterText]}>To date:</Text>
            </View>
            <Pressable style={styles.filterForm} onPress={() => setVisibleDateTo(true)}>
              <Text style={styles.filterText}>{dateTo.getDate()+"/"+(dateTo.getMonth()+1)+"/"+dateTo.getFullYear()}</Text>
            </Pressable>
          </View>
        </View>
        <FlatList
          scrollEnabled={true}
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <ExpenseItem key={item.id} expense={item} />;
          }}
        />
      </View>
      <DatePicker
        modal
        open={visibleDateFrom}
        date={dateFrom}
        onConfirm={(date) => {
          setVisibleDateFrom(false)
          setDateFrom(new Date(date.setHours(0,0,0,0)))
          updateExpenses(new Date(date.setHours(0,0,0,0)),dateTo)
        }}
        onCancel={() => {
          setVisibleDateFrom(false)
        }}
        mode="date"
        title= {null}
        theme='light'
        androidVariant="iosClone"
        fadeToColor="none"
        locale='en'
        is24hourSource="locale"
      />
      <DatePicker
        modal
        open={visibleDateTo}
        date={dateTo}
        onConfirm={(date) => {
          setVisibleDateTo(false)
          setDateTo(new Date(date.setHours(23,59,59,59)))
          updateExpenses(dateFrom,new Date(date.setHours(23,59,59,59)))
        }}
        onCancel={() => {
          setVisibleDateTo(false)
        }}
        mode="date"
        title= {null}
        theme='light'
        androidVariant="iosClone"
        fadeToColor="none"
        locale='en'
        is24hourSource="locale"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  filterContainer: {
    height: 130,
    width: "95%",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 20,
  },
  filterRow: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"row"
  },
  filterForm: {
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20,
    paddingHorizontal:5,
    width:130
  },
  filterText:{
    color:"white",
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
  },
  addNavButton: {
    marginRight: 10,
  },
});
