import { StyleSheet, Text, View, TextInput, ImageBackground,Dimensions,Pressable } from 'react-native'
import { useState,useEffect  } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from '../api/supabase';

WebBrowser.maybeCompleteAuthSession()

const WelcomeScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
   
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '223058968967-m7f1cpmppq6dpa9p10s9vcdqftqugsif.apps.googleusercontent.com',
      })

    const signIn = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
    
        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signInWithIdToken(idToken) {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithIdToken({token:idToken,provider:"google"});
        if (error) Alert.alert(error.message)
        setLoading(false)
      }
    
      useEffect(() => {
        if (response?.type === "success") {
            signInWithIdToken(response.authentication.idToken)
        }
    
      }, [response]);

    const onGoogleButtonPress = async () => {
        await promptAsync()
      }

  return (
    <View style={{flex:1}}>
        <ImageBackground source={require("../img/welcome2.png")} style={styles.background}/>
        <View style={styles.container}>
        <Text style={styles.text}>User:</Text>
        <TextInput 
            style={styles.text_input}
            inputMode="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            />
        <Text style={styles.text}>Password:</Text>
        <TextInput 
            style={styles.text_input}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            autoCapitalize={'none'}
            />
        <Pressable 
            onPress={() => {
                signIn()
            }}
            style={[styles.button,{backgroundColor:"rgb(248, 152, 25)"}]}>
            <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <Pressable 
            onPress={() => navigation.navigate("Register")}
            style={[styles.button,{backgroundColor:"rgb(255, 36, 36)"}]}>
            <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable 
            onPress={() => onGoogleButtonPress()}
            style={[styles.button,{backgroundColor:"rgb(66, 133, 244)",flexDirection:"row",justifyContent:"space-evenly"}]}
            >
            <AntDesign name="google" size={26} color="white" />
            <Text style={[styles.buttonText,]}>Google Login</Text>
        </Pressable>

        </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(75, 75, 75, 0.8)",
        alignSelf:"center",
        width:"80%",
        marginVertical: 20,
        padding:15,
        borderRadius:10,
        marginTop: 70
    },
    text:{
        color:"white",
        fontSize:19,
        alignSelf:"center"
    },
    text_input:{
        alignSelf:"center",
        backgroundColor:"rgba(20, 20, 20, 0.8)",
        borderRadius:10,
        color:"white",
        height: 50,
        marginBottom:20,
        marginTop: 10,
        padding:10,
        width: "90%",

    },
    background:{
        position:"absolute",
        height: Dimensions.get("window").height,
        width:Dimensions.get("window").width
    },
    button:{
        marginVertical:10,
        width:"70%",
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        alignSelf:"center"
    },
    buttonText:{
        color:"white",
        fontSize:18
    }
})