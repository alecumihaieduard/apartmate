import { View,Pressable,StyleSheet } from 'react-native'
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


export default function AddNavButton() {
    const navigation = useNavigation()
    return (
      <Pressable
        onPress={() => navigation.navigate("Add",{type:"add"})}
        style={({ pressed }) => [
          styles.addNavButton,
          pressed ? {opacity: 0.5,} : null,]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",}}>
          <Entypo name="add-to-list" size={24} color="black" />
        </View>
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    addNavButton: {
      marginRight: 10,
    },
  });