import React from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const LoginPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-64 max-w-5xl mx-auto">
      <div className="flex justify-end mb-12">
        <a
          href="./api/auth/login"
          className="px-6 py-3 my-5 text-white bg-blue-500 rounded hover:bg-blue-600 "
        >
          {" "}
          Login
        </a>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="mx-5"
        >
          {theme === "light" ? (
            <BsFillMoonStarsFill
              style={{ color: "black" }}
            ></BsFillMoonStarsFill>
          ) : (
            <BsFillSunFill style={{ color: "white" }}></BsFillSunFill>
          )}
        </button>
      </div>
      <h1 className="mx-auto text-5xl font-bold text-center ">
        Rick and Morty App
      </h1>
      <div className="flex items-center justify-center h-full text-3xl text-center ">
        <span> Please Login to see Character and Episode Data...</span>
      </div>
    </div>
  );
};

export default LoginPage;
