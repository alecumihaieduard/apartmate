import { useNavigation } from '@react-navigation/native'
import { View,Text,StyleSheet, Pressable } from 'react-native'

export default function ExpenseItem({expense}) {
    const navigation = useNavigation()

    let tempDate = expense.date.toDate()
    const fdate = 
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
    
    return(
        <View style={styles.container}>
                <Pressable 
                    style = {({pressed}) => [
                        styles.pressable,
                        pressed ? {opacity:0.3,backgroundColor:"rgb(96, 220, 229)"} : null
                    ]}
                    onPress={() => navigation.navigate("Display",{expense})}
                >
                    <View style={[styles.rowContainer]}>
                        <Text style={[styles.textTitle]}>{expense.title}</Text>
                        <Text style={styles.textAmount}>{expense.amount} Lei</Text>

                    </View>
                    <Text style={styles.dateText}>{fdate}</Text>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    pressable:{
        flex:1,
        padding:10,
    },
    container:{
        width:"90%",
        alignSelf:"center",
        marginVertical:5,
        height:75,
        borderRadius:15,
        backgroundColor:"rgba(20, 20, 20, 0.8)",
    },
    rowContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        height:40,
    },
    textTitle:{
        color:"serif",
        fontSize:16,
        flex:0.65,
        fontFamily:"serif",
        fontStyle:"italic",
        color:"white",
        
    },
    textAmount:{
        color:"white",
        fontSize:21,
        flex:0.35,
        textAlign:"right",
        marginTop:5,
        fontWeight:"bold",
        marginHorizontal:4

    },
    dateText:{
        color:"white",
        fontSize:13,

    }
})

