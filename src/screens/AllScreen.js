import { View, StyleSheet, ImageBackground, Dimensions, FlatList, Button } from "react-native";
import { useLayoutEffect,useEffect, useContext, useReducer } from "react";
import AddNavButton from"../components/AddNavButton"
import ExpenseItem from "../components/ExpenseItem";
import ExpensesContext from "../context/ExpensesContext";

export default function AllScreen({navigation}) {
 
  const {updateExpenses,expenses} = useContext(ExpensesContext)

  useEffect(() => {
    updateExpenses()
  },[])
    
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <AddNavButton/>;
      },
    });
  }, [navigation]);
  


  return (
    <>
    <ImageBackground source={require("../img/background2.png")} style={styles.container} />
      <View style={{flex:1,marginTop:80}} >
        <FlatList
          scrollEnabled={true}
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return(
                <ExpenseItem key={item.id} expense={item}/>
              )
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingTop:20
  },
  addNavButton: {
    marginRight: 10,
  },
});
