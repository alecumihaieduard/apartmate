import { useState, useEffect } from "react";
import { supabase } from "../api/supabase";
import "react-native-url-polyfill/auto";

export function useAuth() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async (e) => {
      setSession(e.data.session);
    });
    supabase.auth.onAuthStateChange(async (_event, e) => {
      setSession(e);
    });
  }, []);

  return {
    session,
  };
}
