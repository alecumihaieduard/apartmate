import { Text, View, ImageBackground, Pressable } from "react-native";
import React, { useContext, useLayoutEffect, useEffect, useState } from "react";
import ExpensesContext from "../context/ExpensesContext";
import { supabase } from "../api/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { FlatList } from "react-native-gesture-handler";
import UserItem from "../components/UserItem";

const ActiveGroupScreen = ({ navigation }) => {
  const { setActiveGroup, activeGroup, leave_group } = useContext(ExpensesContext);
  const [userId, setUserId] = useState(null);
  const [groupUsers, setGroupUsers] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session.user.id);      
    }
    const fetchGroupUsers = async () => {
      const { data: users, error } = await supabase.from("group_user").select(`
        group_id,
        user_id,
        profile(display_name)
        `).
        eq("group_id",activeGroup.id)
      console.log(users,error)
      let tempGroup = []
      users.forEach((user) => {
        tempGroup.push(user.profile.display_name)
      })
      setGroupUsers(tempGroup)

    } 

    fetchUser()
    fetchGroupUsers()

  },[]);


  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../img/paper.jpg")}
        className={"absolute h-screen w-screen"}
      />
      <View className={"mt-10 w-[80%] self-center rounded-lg bg-black/50 p-3"}>
        <Text className={"self-center text-center text-2xl text-white"}>{activeGroup.name}</Text>
        <FlatList
          keyExtractor={(item) => item + Math.random()}
          data={groupUsers}
          renderItem={({item}) => {
            return <UserItem email={item}/>
             
          }
        }
        />
        <Pressable
          onPress={() => {
            setActiveGroup(null);
          }}
          className={"mx-2 mt-5 h-12 w-36 items-center justify-center self-center rounded-lg bg-blue-600 active:opacity-50"}
        >
          <Text>Deactivate Group</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            leave_group(userId, activeGroup.id);
            setActiveGroup(null);
          }}
          className={"mx-2 mt-2 h-12 w-36 items-center justify-center self-center rounded-lg bg-red-600 active:opacity-50"}
        >
          <Text>Leave Group</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ActiveGroupScreen;
