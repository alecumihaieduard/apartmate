import { Text, View } from 'react-native'
import React from 'react'

const UserItem = ({email}) => {
  return (
    <View className={"bg-yellow-500 h-8 w-[70%] rounded-lg self-center mt-2 items-center justify-center"}>
      <Text className={"text-sm"}>{email}</Text>
    </View>
  )
}

export default UserItem
