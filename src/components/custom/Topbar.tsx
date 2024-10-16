"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Button from "./Button";

const Topbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="h-[150px]">
      <div className="rounded-full border lg:mx-40 shadow-lg flex justify-between p-4 items-center">
        <a href="logo" className="text-xl font-semibold">
          NextNotes
        </a>
        {/* <div className="md:flex gap-10 hidden ">
          <a href="Home" className="hover:underline hover:text-main">
            Home
          </a>
          <a href="About" className="hover:underline hover:text-main">
            About
          </a>
          <a href="Service" className="hover:underline hover:text-main">
            Service
          </a>
          <a href="Pages" className="hover:underline hover:text-main">
            Pages
          </a>
          <a href="Contact" className="hover:underline hover:text-main">
            Contact
          </a>
          <a href="Blog" className="hover:underline hover:text-main">
            Blog
          </a>
        </div> */}
        <div className="md:flex gap-4 hidden ">
          <button>Log In</button>
          <Button text={"Sign up Free "} />
        </div>
        <div className="md:hidden" onClick={() => setShowMenu((c) => !c)}>
          <FiMenu size={25} />
        </div>
      </div>

      <div
        className={`flex duration-300 flex-col bg-white border justify-center items-center shadow-xl relative ${
          showMenu ? "top-0" : "top-[-500px]"
        }  m-4 rounded-3xl p-1`}
      >
        {/* <div className="border-b w-full text-center p-2">
          <a href="Home" className="hover:underline hover:text-main">
            Home
          </a>
        </div>
        <div className="border-b w-full text-center p-2">
          <a href="About" className="hover:underline hover:text-main">
            About
          </a>
        </div>
        <div className="border-b w-full text-center p-2">
          <a href="Service" className="hover:underline hover:text-main">
            Service
          </a>
        </div>
        <div className="border-b w-full text-center p-2">
          <a href="Pages" className="hover:underline hover:text-main">
            Pages
          </a>
        </div>
        <div className="w-full text-center border-b p-2">
          <a href="Contact" className="hover:underline hover:text-main">
            Contact
          </a>
        </div> */}
        <button className="w-full p-2 border-b">Log In</button>
        <div className="p-1">
          <Button text={"Sign up Free "} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
