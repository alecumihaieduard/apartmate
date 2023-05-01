import { View, ImageBackground, Pressable, Text, FlatList } from "react-native";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { supabase } from "../api/supabase";
import GroupItem from "../components/GroupItem";
import ExpensesContext from "../context/ExpensesContext";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SelectGroupScreen({ navigation }) {
  const [groups, setGroups] = useState();
  const [selectedGroupId, setSelectedGroupId] = useState({ id: null, name: null });
  const [isInGroup, setIsInGroup] = useState(false);
  const [userId, setUserId] = useState(null);
  const { setActiveGroup, activeGroup, join_group } = useContext(ExpensesContext);

  useEffect(() => {
    updateGroups();
    const channel = supabase
      .channel("schema-group-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "groups" }, () => {
        updateGroups();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session.user.id);
    };
    checkSession();
  });


  const pressGroup = async (id, name) => {
    setSelectedGroupId({ id: id, name: name });
    const { data } = await supabase.from("group_user").select().eq("group_id", id);
    data.forEach((item) => (item.user_id === userId ? setIsInGroup(true) : setIsInGroup(false)));
  };

  const updateGroups = async () => {
    const { data } = await supabase.from("groups").select().order("id", { ascending: true });
    setGroups(data);
  };

  return (
    <SafeAreaView className={"flex-1"}>
      <ImageBackground
        source={require("../img/paper.jpg")}
        className={"absolute h-screen w-screen"}
      />
      <View className={"mt-3 flex-1"}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <GroupItem
                item={item}
                pressGroup={pressGroup}
                selectedGroupId={selectedGroupId.id}
              />
            );
          }}
        />
      </View>
      <View className={"mb-2 flex-row justify-center"}>
        <Pressable
          onPress={() => {
            if (isInGroup) {
              setActiveGroup({ id: String(selectedGroupId.id), name: selectedGroupId.name });
            } else {
              join_group(userId, selectedGroupId.id);
              setActiveGroup({ id: String(selectedGroupId.id), name: selectedGroupId.name });
            }
          }}
          className={"mx-2 h-12 w-36 items-center justify-center self-center rounded-lg bg-blue-600 active:opacity-50"}
        >
          <Text>{isInGroup ? "Activate Group" : "Join Group"}</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("CreateGroup")}
          className={"mx-2 h-12 w-36 items-center justify-center self-center rounded-lg bg-red-600 active:opacity-50"}
        >
          <Text>Create Group</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}
