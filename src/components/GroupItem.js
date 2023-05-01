import { Pressable, Text } from "react-native";
import React from "react";

const GroupItem = ({ item, pressGroup, selectedGroupId }) => {
  return (
    <Pressable
      className={`my-1 h-12 w-[80%] self-center rounded-lg bg-black/50 p-2 ${selectedGroupId === item.id ? "bg-green-500" : "bg-black/50"}`}
      onPress={() => pressGroup(item.id, item.name)}
    >
      <Text className={"text-lg text-white"}>
        #{item.id} - {item.name}
      </Text>
    </Pressable>
  );
};

export default GroupItem;
