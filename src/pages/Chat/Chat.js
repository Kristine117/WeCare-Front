import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate, useLocation } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import dashboard from "./Chat.module.css";
import ChatComponent from "../../components/ChatComponent/ChatComponent";

const Chat = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { recipientId, fullName, profileImage } = location.state;
  return (
    <main>
      {!user?.id && <Navigate to={"/login"} />}

      {user?.id && (
        <section className={dashboard["dashboard"]}>
          <SideMenu />
          <ChatComponent
            recipientId={recipientId}
            fullName={fullName}
            profileImage={profileImage}
          />
        </section>
      )}
    </main>
  );
};

export default Chat;
