import { View, Text, TextInput, Pressable, ImageBackground } from "react-native";
import { useLayoutEffect, useState, useContext, useEffect } from "react";
import ExpensesContext from "../context/ExpensesContext";
import { supabase } from "../api/supabase";

export default function CreateGroupScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Group",
    });
  }, [navigation]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session.user.id);
    };
    checkSession();
  });

  const [name, setName] = useState();

  const { create_group } = useContext(ExpensesContext);

  return (
    <ImageBackground
      className={"absolute h-screen w-screen"}
      source={require("../img/paper.jpg")}
      >
      <View className={"mt-20 w-[90%] items-center self-center rounded-lg bg-black/60 py-2"}>
        <Text className={"text-xl text-white"}>Name of the Group</Text>
        <TextInput
          className={"mt-2 h-12 w-[70%] rounded-lg bg-black/50 p-1 text-base text-white"}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
          maxLength={25}
        />
        <Pressable
          className={"mb-4 mt-2 h-12 w-36 flex-row items-center justify-center rounded-lg bg-green-400 px-7"}
          onPress={() => {
            create_group({ owner_id: userId, name: name });
            navigation.navigate("Groups");
          }}
        >
          <Text className={"text-2xl text-white"}>Create</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
