import "./App.css";
import FrontPage from "./Components/FrontPage";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Components/Login";
import { useEffect } from "react";
import Contacts from "./Components/Contacts";
import Conversation from "./Components/Conversation";
import ChatHub from "./Components/ChatHubConnection";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const ticket = localStorage.getItem("ticket");
    // const expireDateTime = localStorage.getItem("expireDate");
    // var today = new Date();
    // var isoString = today.toISOString();
    // var slicedString = isoString.slice(0, 23);
    // var replacedString = slicedString.replace(/-/g, "/");
    // var formattedDate = replacedString + "+03:30";

    const isAuthenticated = ticket ? true : false;
    isAuthenticated
      ? navigate(process.env.PUBLIC_URL + "/FrontPage")
      : navigate(process.env.PUBLIC_URL + "/Login");
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/FrontPage`}
          element={<FrontPage />}
        />
        <Route path={`${process.env.PUBLIC_URL}/Login`} element={<Login />} />
        <Route
          path={`${process.env.PUBLIC_URL}/Contacts`}
          element={<Contacts />}
        />
        <Route path={`${process.env.PUBLIC_URL}/Conversation`} element={<Conversation />} />
        <Route path={`${process.env.PUBLIC_URL}/ChatHub`} element={<ChatHub />} />
      </Routes>
    </div>
  );
}
export default App;
