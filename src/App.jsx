import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layouts/Layout.jsx";
import Home from "./Pages/Home.jsx";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Expenses from "./Pages/Expenses.jsx";
import Income from "./Pages/Income.jsx";

export const backendUrl = "http://localhost:5000";
export const GlobalContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/getLoggedInUser`, {
        withCredentials: true,
      });
      setLoggedInUser(response.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
try {
      const response = await axios.get(`${backendUrl}/user/logout`,{
        withCredentials:true,
      })
      console.log(response);
      setLoggedInUser({});
      setIsLoggedIn(false);
} catch (error) {
  console.log(error);
}
  }

  console.log(loggedInUser);

  useEffect(() => {
    getLoggedInUser();
  },[])

  return (
    <>
      <GlobalContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
          isLoggedIn,
          setIsLoggedIn,
          logoutUser,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Dashboard/>} />
                <Route path="Expenses" element={<Expenses/>}/>
                <Route path="Income" element={<Income/>}/>
              </Route>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
