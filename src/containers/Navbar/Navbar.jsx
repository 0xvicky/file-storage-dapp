import React, { useContext, useState } from "react";
import UserContext from "../../context/User/UserContext";
import toast, { Toaster } from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const user = useContext(UserContext);
  const handleAddress = () => {
    user.setIsClicked(true);
  };
  return (
    <>
      <Toaster />
      <div className="bg-black p-12 flex justify-between">
        <div className="header text-white font-semibold text-2xl">
          Simple Storage
        </div>
        {user.isClicked ? (
          user.isMetamask ? (
            user.isChainChanged ? (
              <button className="connBtn text-black bg-white rounded-md p-3 font-semibold ">
                {`${user.userAddr.slice(0, 8)}....${user.userAddr.slice(
                  -7,
                  -1
                )}`}
              </button>
            ) : (
              <button className="connBtn text-black bg-white rounded-md p-3 font-semibold ">
                Connecting....
              </button>
            )
          ) : (
            <button className="connBtn text-black bg-white rounded-md p-3 font-semibold ">
              Please Install Metamask
            </button>
          )
        ) : (
          <>
            <button
              className="connBtn text-black bg-white rounded-md p-3 font-semibold "
              onClick={handleAddress}
            >
              Connect
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
