import { Text, View, ImageBackground } from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";

const NoGroupScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: "",
    });
  }, [navigation]);
  return (
    <View className={"flex-1"}>
      <ImageBackground
      className={"absolute h-screen w-screen"}
      source={require("../img/paper.jpg")}
      />

      <View className={"mt-[90%] h-12 w-[70%] justify-center self-center"}>
        <Text className={"flex-1 text-center text-xl font-bold text-black"}>No Group Active</Text>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default NoGroupScreen;
