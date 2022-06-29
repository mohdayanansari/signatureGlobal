import React from "react";
// Importing Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/index.js";

// ! ------>
import { useSelector } from "react-redux";


const Dashboard = () => {
  const users = useSelector((state) => state.newchat.users);

  return (
    <div className="grid lg:grid-cols-12 w-full">
      {/* User Chat */}
      <UserChat recentChatList={users} />
    </div>
  );
};
    
// export default connect(mapStateTpProps, {})(Dashboard);
export default Dashboard;
