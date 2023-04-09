import { useLayoutEffect, useContext } from 'react'
import { View,Text,StyleSheet, ImageBackground, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import ExpensesContext from '../context/ExpensesContext';

export default function DisplayElementScreen({route,navigation}) {
    
    const expense = route.params.expense
    let tempDate = new Date(expense.date)
    
    const fdate = 
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Detailed Expense"
        })
    },[navigation])

    const {remove_from_db} = useContext(ExpensesContext)
    return(
        <ImageBackground style={{flex:1}} source={require("../img/background2.png")}>
            <View style={styles.container}>

                <Text style={styles.textTitle}>{expense.title}</Text>
                <Text style={styles.textDetails}>{expense.details}</Text>
                <Text style={styles.textAmount}>{expense.amount} $</Text>
                <Text style={styles.textDate}>{fdate}</Text>
                
                <View style={styles.buttonsRow}>
                    <View style={[styles.button,{backgroundColor:"rgb(0, 221, 215)"}]}>
                        <Pressable
                            style={({pressed}) => [
                                {flex:1,justifyContent:"center"},
                                pressed ? {opacity:0.2} : null
                            ]}
                            onPress={() => {navigation.navigate("Edit",{expense:expense})}}    
                        >
                            <AntDesign name="edit" size={60} color="white" />
                        </Pressable>
                    </View>
                    <View style={[styles.button,{backgroundColor:"red"}]}>
                        <Pressable
                            style={({pressed}) => [
                                {flex:1,justifyContent:"center"},
                                pressed ? {opacity:0.2} : null
                            ]}  
                            onPress={() => {
                                remove_from_db("expenses",expense.id)
                                navigation.goBack()
                            }}  
                        >
                            <EvilIcons name="trash" size={60} color="white" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"90%",
        backgroundColor:"rgba(21, 20, 20, 0.8)",
        alignSelf:"center",
        borderRadius:10,
        marginTop:80,
        paddingVertical:20
    },
    textTitle:{
        alignSelf:"center",
        color:"white",
        fontSize:23,
        textAlign:"center"
    },
    textDetails:{
        alignSelf:"center",
        color:"white",
        fontSize:16,
        textAlign:"center",
        marginHorizontal:10,
        marginTop:15
    },
    textAmount:{
        alignSelf:"center",
        color:"white",
        fontSize:30,
        marginTop: 15
    },
    textDate:{
        alignSelf:"center",
        color:"white",
        fontSize:20,
        marginTop: 15
    },
    buttonsRow:{
        flexDirection: "row",
        justifyContent:"space-evenly",
        marginTop:20
    },
    button:{
        height:80,
        width:120,
        borderRadius:15,
        alignItems:"center"
    }
})