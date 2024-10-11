import "./App.css";
import { useState, useEffect } from "react";
import Logout from "./pages/Logout/Logout";
import Home from "./pages/Home/Home";
import Registration1 from "./pages/Register/Registration1";
import Home2 from "./pages/Home2";
// import Registration2 from "./pages/Registration2";
import Registration3 from "./pages/Register/Registration3";
// import DashBoardSenior from "./pages/DashBoardSenior";
// import DashBoardSeniorFind from "./pages/DashBoardSeniorFind";
// import DashBoardSeniorMessage from "./pages/DashBoardSeniorMessage";
// import DashBoardSeniorAppointment from "./pages/DashBoardSeniorAppointment";

import DashBoardSenior from "./pages/Dashboard/DashBoardSenior";
import DashBoardCareGiver from "./pages/Dashboard/DashBoardCareGiver";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/Dashboard/DashBoard";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import Chat from "./pages/Chat/Chat";
import ChatList from "./pages/ChatList/ChatList";
import Error from "./pages/Error/Error";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // for getting token this is for global this is helped whit the UserContext.js
  const [user, setUser] = useState({
    // this is just set to null
    id: null,
    encryptedId: null,
    lastname: null,
    firstname: null,
    email: null,
    userType: null,
    street: null,
    barangayId: null,
    contactNumber: null,
    gender: null,
    birthDate: null,
    experienceId: null,
  });

  // for clearing token of logout
  const unsetUser = () => {
    localStorage.clear();
  };

  // this is where you generate the details of the user to be put in the global
  useEffect(() => {
    // fetch data from db
    fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // if there is data passed go to if and if there is non else
        if (data.auth !== "Failed") {
          console.log(data);
          // the passed id will be set in the setUser asand will be set globally carried in line 21 const [user, setUser] = useState and so on
          setUser({
            id: data.data.userId,
            encryptedId: data.data.userType,
            lastname: data.data.lastname,
            firstname: data.data.firstname,
            email: data.data.email,
            userType: data.data.userType,
            street: data.data.street,
            barangayId: data.data.barangayId,
            contactNumber: data.data.contactNumber,
            gender: data.data.gender,
            birthDate: data.data.birthDate,
            experienceId: data.data.experienceId,
          });
        } else {
          setUser({
            id: null,
            userType: null,
          });
        }
      });
    console.log(localStorage);
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
       {!user?.id &&  <AppNavbar />}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration1" element={<Registration1 />} />
          <Route path="/registration3" element={<Registration3 />} />
          <Route path="/dashboard-main" element={<DashBoard/>} />
        
           <Route path="/chatlist" element={<ChatList />} />
          <Route path="/chat/:senderId/:receiverId" element={<Chat/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" errorElement={<Error/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
