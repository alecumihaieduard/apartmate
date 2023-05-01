import { Text, TextInput, ImageBackground, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { supabase } from "../api/supabase";
import Spinner from "react-native-loading-spinner-overlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "223058968967-m7f1cpmppq6dpa9p10s9vcdqftqugsif.apps.googleusercontent.com",
  });

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) console.log(error.message);
    setLoading(false);
  };

  async function signInWithIdToken(idToken) {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithIdToken({
      token: idToken,
      provider: "google",
    });
    if (error) console.log(error.message);
    setLoading(false);
  }

  useEffect(() => {
    if (response?.type === "success") {
      signInWithIdToken(response.authentication.idToken);
    }
  }, [response]);

  const onGoogleButtonPress = async () => {
    await promptAsync();
  };

  return (
    <>
      <ImageBackground
        className={"absolute h-screen w-screen"}
        source={require("../img/welcome.png")}
      />
      <SafeAreaView className={"top-20 w-[80%] self-center rounded-3xl bg-black/50 p-3"}>
        <Image
          className={"h-36 w-36 self-center"}
          source={require("../img/logo.png")}
        />
        <Text className={"self-center text-lg text-white"}>User:</Text>
        <TextInput
          className={"mb-3 mt-2 h-12 w-[90%] self-center rounded-xl bg-zinc-900/80 p-2 text-white"}
          inputMode="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          placeholderTextColor={"grey"}
        />
        <Text className={"self-center text-lg text-white"}>Password:</Text>
        <TextInput
          className={"mb-3 mt-2 h-12 w-[90%] self-center rounded-xl bg-zinc-900/80 p-2 text-white"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          autoCapitalize={"none"}
          placeholderTextColor={"grey"}
        />
        <Pressable
          className={"my-2 h-12 w-[70%] items-center justify-center self-center rounded-xl bg-orange-400 active:opacity-50"}
          onPress={() => {
            signIn();
          }}
        >
          <Text className={"text-lg text-white"}>Log In</Text>
        </Pressable>
        <Pressable
          className={"my-2 h-12 w-[70%] items-center justify-center self-center rounded-xl bg-red-600 active:opacity-50"}
          onPress={() => navigation.navigate("Register")}
        >
          <Text className={"text-lg text-white"}>Register</Text>
        </Pressable>
        <Pressable
          className={"my-2 h-12 w-[70%] flex-row items-center justify-evenly self-center rounded-xl bg-blue-600 active:opacity-50"}
          onPress={() => onGoogleButtonPress()}
        >
          <AntDesign
            name="google"
            size={26}
            color="white"
          />
          <Text className={"text-lg text-white"}>Google Login</Text>
        </Pressable>
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "white" }}
        />
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
};

export default WelcomeScreen;
