import React from "react";

//! Redux

import { TabContent, TabPane } from "reactstrap";

// Importing Side Menu Bar
import LeftSideBarMenu from "../../components/LeftSideBarMenu";
// Importing Tabs Components
// import Profile from "./Tabs/Profile";
import Chats from "./Tabs/Chats";

const ChatLeftSidebar = (props) => {
  const activeTab = props.activeTab;

  return (
    <div className="col-span-1 overflow-hidden">
      <LeftSideBarMenu />
    </div>
  );
};

export default ChatLeftSidebar;
