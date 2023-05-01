import { createContext, useState } from "react";
import { supabase } from "../api/supabase";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const add_to_db = async (table, data) => {
    const { error } = await supabase.from(table).insert(data);
    if (error) {
      console.log(error);
    }
  };

  const edit_from_db = async (table, id, data) => {
    const { error } = await supabase.from(table).update(data).eq("id", id);
    if (error) {
      console.log(error);
    }
  };

  const remove_from_db = async (table, id) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      console.log(error);
    }
  };

  const create_group = async (creationData) => {
    const { data, error } = await supabase.from("groups").insert(creationData).select();
    if (error) {
      console.log(error);
    }
    await supabase.from("group_user").insert({
      user_id: creationData.owner_id,
      group_id: data[0].id,
    });
    if (error) {
      console.log(error);
    }
  };

  const join_group = async (user_id, group_id) => {
    const { error } = await supabase.from("group_user").insert({
      user_id: user_id,
      group_id: group_id,
    });
    if (error) {
      console.log(error);
    }
  };

  const leave_group = async (user_id, group_id) => {
    const { error } = await supabase.from("group_user").delete().eq("user_id", user_id).eq("group_id", group_id);

    if (error) {
      console.log(error);
    }
  };

  const [activeGroup, setActiveGroup] = useState(null);
  const [dateFrom, setDateFrom] = useState(new Date("2020-01-01"));
  const [dateTo, setDateTo] = useState(new Date(new Date().setHours(23, 59, 59, 59)));
  return (
    <ExpensesContext.Provider
      value={{
        add_to_db,
        edit_from_db,
        remove_from_db,
        create_group,
        activeGroup,
        setActiveGroup,
        join_group,
        leave_group,
        dateFrom,
        setDateFrom,
        dateTo,
        setDateTo
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
