import { createContext } from "react";
import {supabase} from "../api/supabase"

const ExpensesContext = createContext()

export const ExpensesProvider = ({children}) => {

    const add_to_db = async (data) => {
        
        // const ref = collection(firestore,"test_data")
        try {
            // addDoc(ref,data)
        }catch(err) {
            console.log(err)
        }
    }

    const edit_db = async (id,data) => {
        // const docRef = doc(firestore,"test_data",id)
        // const update = await updateDoc(docRef, data)
    }

    const remove_db = async (id) => {
        // await deleteDoc(doc(firestore,"test_data",id))
    }

    return(
        <ExpensesContext.Provider 
            value={{add_to_db,edit_db,remove_db}}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContext