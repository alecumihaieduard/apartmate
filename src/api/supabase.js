import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabaseUrl = "http://158.220.98.163:8000"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgInJvbGUiOiAiYW5vbiIsCiAgICAiaXNzIjogInN1cGFiYXNlIiwKICAgICJpYXQiOiAxNjgwNDY5MjAwLAogICAgImV4cCI6IDE4MzgzMjIwMDAKfQ.SSjF8B24FgOnNpDntwt18_NAbrj18tIgQCK9iLjW2fs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    eventsPerSecond: 10,
  },
})