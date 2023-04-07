
import { useState,useEffect } from "react";
import { supabase } from "../api/supabase"
import 'react-native-url-polyfill/auto'

export function useAuth() {
  
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      setUser(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session)
    })
  }, []);
  
  return {
    user,
  };
}