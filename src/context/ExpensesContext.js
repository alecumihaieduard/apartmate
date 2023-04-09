import { createContext } from "react";
import {supabase} from "../api/supabase"

const ExpensesContext = createContext()

export const ExpensesProvider = ({children}) => {

    const add_to_db = async (table,data) => {
        const {error} = await supabase
            .from(table)
            .insert(data)
        if (error) {
            console.log(error)
        }
    }

    const edit_from_db = async (table,id,data) => {
        const { error } = await supabase
            .from(table)
            .update(data)
            .eq('id', id)
        if (error) {
            console.log(error)
        }
    }

    const remove_from_db = async (table,id) => {
        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', id)
        if (error) {
            console.log(error)
        }
    }

    return(
        <ExpensesContext.Provider 
            value={{add_to_db,edit_from_db,remove_from_db}}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContext