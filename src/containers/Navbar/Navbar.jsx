import React, { useContext, useState } from "react"
import UserContext from "../../context/User/UserContext"
import toast, { Toaster } from "react-hot-toast"
import "./Navbar.css"

const Navbar = () => {
  const user = useContext(UserContext)
  const handleAddress = () => {
    user.setIsClicked((prev) => {
      return !prev
    })
    console.log(user.isClicked)
  }

  return (
    <>
      <Toaster />
      <div className="bg-gradient-to-l from-[#c04848] to-[#480048] p-12 flex justify-between">
        <div className="header text-white font-semibold text-2xl">IPFS Storage</div>
        {user.isMetamask ? (
          user.userAddr !== undefined ? (
            <div className="bg-white rounded-md ">
              <button className="bg-gradient-to-r from-[#c04848] to-[#480048] font-bold p-2 text-2xl text-transparent bg-clip-text">
                {`${user.userAddr.slice(0, 8)}....${user.userAddr.slice(-7, -1)}`}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-md ">
              <button
                className="bg-gradient-to-r from-[#c04848] to-[#480048] font-bold p-2 text-2xl text-transparent bg-clip-text"
                onClick={handleAddress}>
                Connect
              </button>
            </div>
          )
        ) : (
          <button className="connBtn text-black bg-white rounded-md p-3 font-semibold">
            Install Metamask
          </button>
        )}
      </div>
    </>
  )
}

export default Navbar

{
  /* <button className="connBtn text-black bg-white rounded-md p-3 font-semibold ">
          {`${user.userAddr.slice(0, 8)}....${user.userAddr.slice(-7, -1)}`}
        </button> */
}
