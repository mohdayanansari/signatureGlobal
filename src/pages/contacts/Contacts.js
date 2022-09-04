import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/reducer/chat";
import Header from "./components/Header";

import ContactTable from "./components/Table/ContactTable";

export default function Contacts() {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.chat.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  return (
    <div>
      <Header />
      <ContactTable contacts={contacts} />
    </div>
  );
}
