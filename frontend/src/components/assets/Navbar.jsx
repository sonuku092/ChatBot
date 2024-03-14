import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navLinks } from "./constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [active, setActive] = useState("profile");
  const [toggle, setToggle] = useState(false);

  const handleSignout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/home");
  };

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  return (
    <nav className="z-10">
      <div className="w-full px-14 py-1 mb-1 border-2 rounded-lg bg-blue-100 fixed">
        <div className="flex gap-1">
          <div className="flex items-center px-2 max-h-max rounded-sm py-1">
            <h1 className="">Chatbot</h1>
          </div>
          <div className="flex-grow max-h-max rounded-sm py-2 h-10">
            
          </div>
          <div className="flex w-auto px-5 py-1 max-h-max rounded-sm items-center hover:bg-slate-50">
            <h1>Eng</h1>
          </div>
          <div
            className="flex w-auto pl-8 py-1 max-h-max rounded-sm items-center hover:bg-slate-50 hover:cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            <h2 className="text-[#5f9ea0]">
              {userName ? `Welcome - ${userName}` : "Please Login"}
            </h2>
            <div className="w-6 h-6 rounded-[50%] border-[1px] mx-2 border-[#5f9ea0]"></div>
          </div>
        </div>

        <div
          className={`${
            !toggle ? "hidden" : "flex flex-col"
          } backdrop-blur-sm shadow-md bg-blue-100 absolute top-[50px] border-[1px] border-dimWhite right-12 mx-2 my-2 p-[4px] min-w-[240px] rounded-lg sidebar`}
        >
          <h3 className="font-poppins font-normal  text-center text-black">
            Menu
          </h3>
          <ul className="list-none flex justify-end items-start flex-1 flex-col border-b-[1px] border-t-[1px] border-black/20 py-1 mb-1 gap-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] w-full p-[4px] rounded-md hover:bg-slate-300 ${
                  active === nav.title
                    ? " text-secondary bg-gradient-to-r from-slate-100 to-gray-50"
                    : "text-white"
                }`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`} className="flex">
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center">
            <button
              className="w-full h-8 bg-gradient-to-r from-slate-100 to-gray-50 rounded-md"
              onClick={handleSignout}
            >
              Sing Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
