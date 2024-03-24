import React, { useContext, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginErrorMsg,setLoginErrorMsg] = useState("");
  const {setIsLoggedIn,setLoggedInUser} = useContext(GlobalContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIsLoggedIn(true);
      setLoggedInUser(response.data.user);
      navigate('/');

    } catch (error) {
      console.log(error);
      setLoginErrorMsg(error.response.data.message);
      setTimeout(()=>{
        setLoginErrorMsg("");
      },3000)
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-center items-center my-28">
        <div className="border-2 rounded-lg shadow-lg px-4 py-8 flex flex-col items-center w-[50%]">
          <h1 className="text-xl text-blue-500 font-semibold my-2">Login</h1>
          <form onSubmit={loginUser} className="flex flex-col gap-2 w-[80%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blue-500">
                Enter email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="email"
                name="email"
                id="email"
                placeholder="eg:john135@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-blue-500" htmlFor="password">
                Enter password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-lg p-2"
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <div className="flex items-center gap-2">
                <input
                  onChange={() => setIsShowPassword(!isShowPassword)}
                  checked={isShowPassword}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>Show password</p>
              </div>
            </div>
            <div className="text-red-500 font-semibold">
                {loginErrorMsg}
            </div>
            <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Login
            </button>
            <div className="my-2">
                <p>Don't have an account. <Link className="text-blue-500" to='/register'>Register here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
