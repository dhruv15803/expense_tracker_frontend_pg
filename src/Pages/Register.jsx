import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [registerErrorMsg,setRegisterErrorMsg] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/user/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      setUsername("");
      setEmail("");
      setPassword("");
      navigate('/login');
    } catch (error) {
      console.log(error);
      setRegisterErrorMsg(error.response.data.message);
      setTimeout(() => {
        setRegisterErrorMsg("");
      },3000)
    }
  };

  return (
    <>
      <div className="w-[100%] flex justify-center items-center my-28">
        <div className="border-2 rounded-lg shadow-lg px-4 py-8 flex flex-col items-center w-[50%]">
          <h1 className="text-xl text-blue-500 font-semibold my-2">Register</h1>
          <form onSubmit={registerUser} className="flex flex-col gap-2 w-[80%]">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-blue-500">
                Enter username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="text"
                name="username"
                id="username"
                placeholder="eg:john135"
              />
            </div>
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
                {registerErrorMsg}
            </div>
            <button className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
