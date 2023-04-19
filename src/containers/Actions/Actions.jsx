import React, { useContext, useEffect, useState } from "react"
import { Register, Upload } from "./../../components"
import UserContext from "../../context/User/UserContext"
import "./Actions.css"
import { contractAddress, abi } from "../../utils/interface"
import { ethers } from "ethers"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../../components/Dashboard/Dashboard"
const Actions = () => {
  const user = useContext(UserContext)

  useEffect(() => {
    console.log("reg triggere...")
    user.signer !== undefined && checkRegistered()
  }, [user.userAddr, user.isRegChange])

  const checkRegistered = async () => {
    const contract = new ethers.Contract(contractAddress, abi, user.signer)
    try {
      const info = await contract.userInfo(user.userAddr)
      console.log(info.isReg)
      user.setIsRegistered(info.isReg)
    } catch (error) {
      console.log(`Error occured while getting userInfo:${error}`)
    }
  }

  return (
    <>
      <div className=" flex  py-6 items-center h-[84.5vh] bg-gray-200">
        {user.isRegistered ? (
          <>
            <Routes>
              <Route
                path="/"
                element={<Upload />}
              />
              <Route
                path="/Dashboard"
                element={<Dashboard />}
              />
            </Routes>
          </>
        ) : (
          <Register />
        )}
      </div>
    </>
  )
}

export default Actions
