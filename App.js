import UserStack from "./src/navigators/userStack";
import AuthStack from "./src/navigators/authStack";
import "expo-dev-client";
import { useFonts } from "expo-font";
import { useAuth } from "./src/hooks/useAuth";

const App = () => {
  let [fontsLoaded] = useFonts({
    // "SanFrancisco": require("./assets/")
  });

  const { session } = useAuth();

  return session && session.user ? <UserStack /> : <AuthStack />;
};

export default App;
