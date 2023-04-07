import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState } from "react";
import { supabase } from "../api/supabase";

const RegisterScreen = ({ navigation }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
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
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Passwords do not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
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
    if (
      !error.email &&
      !error.password &&
      !error.confirmPassword &&
      input.email &&
      input.password &&
      input.confirmPassword
    ) {
      await supabase.auth.signUp(input.email, input.password)
        .then((userCredential) => {
          console.log("Created user", input.email);
        })
        .catch((error) => {
          // let errorCode = error.code;
          let errorMessage = error.message;
          if (error.message === "Firebase: Error (auth/invalid-email).") {
            // errorMessage = "You need to enter a valid email address.";
            setError((prev) => {
              return {...prev,"email":"Invalid email format."}
            })
          } else if (
            error.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
            
          ) {
            // errorMessage = "Password should be at least 6 characters.";
            setError((prev) => {
              return {...prev,"password":"Password must be at least 6 char."}
            })
          } else if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            // errorMessage = "Email address already in use.";
            setError((prev) => {
              return {...prev,"email":"Email address already in use."}
            })
          }
          // Alert.alert("Account creation failed", errorMessage);
          console.log(errorMessage);
        });
    } else {
      validateInput(input.email, "email");
      validateInput(input.password, "password");
      validateInput(input.confirmPassword, "confirmPassword");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../img/welcome2.png")}
        style={styles.background}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Email address:</Text>
        <TextInput
          style={[
            styles.text_input,
            error.email ? { borderColor: "red", borderWidth: 3 } : null,
          ]}
          inputMode="email"
          value={input.email}
          onBlur={(e) =>
            validateInput(e._dispatchInstances.memoizedProps.value, "email")
          }
          onChangeText={(e) => onInputChange(e, "email")}
        />
        <View style={styles.emptySpaceForError}>
          {error.email && <Text style={styles.errorText}>{error.email}</Text>}
        </View>
        <Text style={styles.text}>Enter password:</Text>
        <TextInput
          style={[
            styles.text_input,
            error.password ? { borderColor: "red", borderWidth: 3 } : null,
          ]}
          secureTextEntry
          value={input.password}
          onBlur={(e) =>
            validateInput(e._dispatchInstances.memoizedProps.value, "password")
          }
          onChangeText={(e) => onInputChange(e, "password")}
        />
        <View style={styles.emptySpaceForError}>
          {error.password && (
            <Text style={styles.errorText}>{error.password}</Text>
          )}
        </View>
        <Text style={styles.text}>Confirm password:</Text>
        <TextInput
          style={[
            styles.text_input,
            error.confirmPassword
              ? { borderColor: "red", borderWidth: 3 }
              : null,
          ]}
          secureTextEntry
          value={input.confirmPassword}
          onBlur={(e) =>
            validateInput(
              e._dispatchInstances.memoizedProps.value,
              "confirmPassword"
            )
          }
          onChangeText={(e) => onInputChange(e, "confirmPassword")}
        />
        <View style={styles.emptySpaceForError}>
          {error.confirmPassword && (
            <Text style={styles.errorText}>{error.confirmPassword}</Text>
          )}
        </View>

        <Pressable
          onPress={signUp}
          style={[styles.button, { backgroundColor: "rgb(255, 36, 36)" }]}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "rgba(75, 75, 75, 0.8)",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 80,
    padding: 20,
    width: "80%",
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 17,
  },
  text_input: {
    alignSelf: "center",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    borderRadius: 10,
    color: "white",
    height: 50,
    marginTop: 10,
    padding: 10,
    width: "90%",
  },
  emptySpaceForError: {
    height: 30,
  },
  errorText: {
    alignSelf: "center",
    color: "rgb(225, 145, 145)",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor:"black",
    textShadowOffset:{"width":-1,height:1},
    textShadowRadius:5
  },
  background: {
    height: Dimensions.get("window").height,
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    marginVertical: 10,
    width: "70%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
