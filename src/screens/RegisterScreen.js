import { Text, View, TextInput, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { useState } from "react";
import { supabase } from "../api/supabase";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMess, setErrorMess] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onInputChange = (value, name) => {
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(value, name);
  };

  const validateInput = (value, name) => {
    setErrorMess((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Email.";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Passwords do not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword ? "" : errorMess.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Passwords do not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const signUp = async () => {
    setLoading(true);
    if (!errorMess.email && !errorMess.password && !errorMess.confirmPassword && input.email && input.password && input.confirmPassword) {
      const { user, session, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });
      if (user) {
        console.log("Created user", user);
      }
      if (error) {
        let errorMessage = error.message;
        if (errorMessage === "Unable to validate email address: invalid format") {
          setErrorMess((prev) => {
            return { ...prev, email: "Invalid email format." };
          });
        } else if (errorMessage === "Password should be at least 6 characters") {
          setErrorMess((prev) => {
            return { ...prev, password: "Password must be at least 6 char." };
          });
        } else if (errorMessage === "User already registered") {
          setErrorMess((prev) => {
            return { ...prev, email: "Email address already in use." };
          });
        }
        console.log(error.message);
      }
    } else {
      validateInput(input.email, "email");
      validateInput(input.password, "password");
      validateInput(input.confirmPassword, "confirmPassword");
    }
    setLoading(false);
  };
  return (
    <>
      <ImageBackground
        className={"absolute h-screen w-screen"}
        source={require("../img/welcome.png")}
      />
      <SafeAreaView className={"top-20 w-[80%] self-center rounded-3xl bg-black/50 p-3"}>
        <Text className={"self-center text-lg text-white"}>Email address:</Text>
        <TextInput
          className={`shadow-cya mb-3 mt-2 h-12 w-[90%] self-center rounded-xl bg-zinc-900/80 p-2 text-white ${errorMess.email ? "border-2 border-red-600" : ""}`}
          inputMode="email"
          value={input.email}
          onBlur={(e) => validateInput(e._dispatchInstances.memoizedProps.value, "email")}
          onChangeText={(e) => onInputChange(e, "email")}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          placeholderTextColor={"grey"}
        />
        <View className={"h-7"}>{errorMess.email && <Text className={"self-center text-base text-[#fb4848]"}>{errorMess.email}</Text>}</View>
        <Text className={"self-center text-lg text-white"}>Password:</Text>
        <TextInput
          className={`mb-3 mt-2 h-12 w-[90%] self-center rounded-xl bg-zinc-900/80 p-2 text-white ${errorMess.password ? "border-2 border-red-600" : ""}`}
          secureTextEntry
          value={input.password}
          onBlur={(e) => validateInput(e._dispatchInstances.memoizedProps.value, "password")}
          onChangeText={(e) => onInputChange(e, "password")}
          placeholder="password"
          autoCapitalize={"none"}
          placeholderTextColor={"grey"}
        />
        <View className={"h-7"}>{errorMess.password && <Text className={"self-center text-base text-[#fb4848]"}>{errorMess.password}</Text>}</View>
        <Text className={"self-center text-lg text-white"}>Confirm password:</Text>
        <TextInput
          className={`mb-3 mt-2 h-12 w-[90%] self-center rounded-xl bg-zinc-900/80 p-2 text-white ${errorMess.confirmPassword ? "border-2 border-red-600" : ""}`}
          secureTextEntry
          value={input.confirmPassword}
          onBlur={(e) => validateInput(e._dispatchInstances.memoizedProps.value, "confirmPassword")}
          onChangeText={(e) => onInputChange(e, "confirmPassword")}
          placeholder="password"
          autoCapitalize={"none"}
          placeholderTextColor={"grey"}
        />
        <View className={"h-7"}>{errorMess.confirmPassword && <Text className={"self-center text-base text-[#fb4848]"}>{errorMess.confirmPassword}</Text>}</View>
        <Pressable
          className={"my-2 h-12 w-[70%] items-center justify-center self-center rounded-xl bg-red-600 active:opacity-50"}
          onPress={signUp}
        >
          <Text className={"text-lg text-white"}>Create Account</Text>
        </Pressable>
      </SafeAreaView>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    </>
  );
};

export default RegisterScreen;
