import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useLayoutEffect, useState, useContext } from "react";

import { Entypo } from "@expo/vector-icons";
import ExpensesContext from "../context/ExpensesContext";
import { useAuth } from "../hooks/useAuth";
import DatePicker from 'react-native-date-picker'


export default function AddScreen({ navigation, route }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const {user} = useAuth()
  
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: type === "add" ? "Add Expense" : "Edit expense",
    });
  }, [navigation]);
  
  const type = route.params.type;
  
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [details, setDetails] = useState();

  const {add_to_firestore} = useContext(ExpensesContext)

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require("../img/background2.png")}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Name of the expense</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.Input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            maxLength={35}
            />
        </View>
        <Text style={styles.titleText}>Details of the expense</Text>
        <View style={styles.detailsContainer}>
          <TextInput
            style={[styles.Input,{textAlignVertical: 'top',}]}
            value={details}
            onChangeText={(text) => {
                setDetails(text);
            }}
            maxLength={150}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.titleText}>Amount</Text>
            <View style={[styles.dateAmountContainer]}>
              <TextInput
                style={[
                  styles.Input,
                  { textAlign: "right", fontSize: 22, flex: 7, marginRight: 3 },
                ]}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={5}
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  color: "white",
                  flex: 3,
                }}
              > Lei
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.titleText}>Date</Text>
            <View style={[styles.dateAmountContainer]}>
              <Pressable
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => setShowCalendar(true)}
              >
                <Text
                  style={[
                    styles.Input,
                    { textAlign: "center", textAlignVertical:"center",fontSize:18 },
                  ]}
                >
                  {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            add_to_firestore({
                title: title,
                amount: amount,
                date: date,
                details: details,
                email: user.email
              })
            navigation.navigate("All");
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>ADD</Text>
          <Entypo name="add-to-list" size={24} color="white" />
        </Pressable>
        <DatePicker
        modal
        open={showCalendar}
        date={date}
        onConfirm={(date) => {
          setShowCalendar(false)
          setDate(date)
        }}
        onCancel={() => {
          setShowCalendar(false)
        }}
        mode="date"
        title= {null}
        theme='light'
        androidVariant="iosClone"
        fadeToColor="none"
        locale='ro'
        is24hourSource="locale"
      />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.596)",
    width: "90%",
    alignSelf: "center",
    marginTop: 80,
    borderRadius: 15,
  },
  button: {
    height: 50,
    backgroundColor: "green",
    width: 150,
    marginTop: 5,
    marginBottom:15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  imageBackground: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  InputContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 10,
    height: 50,
    width: "70%",
    borderRadius: 10,
    padding: 5,
  },
  Input: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  titleText: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  dateAmountContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginVertical: 10,
    height: 50,
    width: 120,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 10,
    height: 150,
    width: "80%",
    borderRadius: 10,
    padding: 5,
  },
});
