import UserStack from "./src/navigators/userStack";
import AuthStack from "./src/navigators/authStack";
import { useAuth } from "./src/hooks/useAuth";
import "expo-dev-client"

export default function App() {

  const {user} = useAuth()
  
  return user && user.user ? <UserStack /> : <AuthStack />
  // return <AuthStack/>
}
