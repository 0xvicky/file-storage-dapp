import React, { useContext, useEffect, useState } from "react"
import { Register, Upload } from "./../../components"
import UserContext from "../../context/User/UserContext"
import "./Actions.css"
import { contractAddress, abi } from "../../utils/interface"
import { ethers } from "ethers"
const Actions = () => {
  const user = useContext(UserContext)
  const [isRegistered, setIsRegistered] = useState()
  useEffect(() => {
    user.signer !== undefined && checkRegistered()
  }, [user.userAddr, user.isRegChange])

  const checkRegistered = async () => {
    const contract = new ethers.Contract(contractAddress, abi, user.signer)
    try {
      const info = await contract.userInfo(user.userAddr)
      console.log(info.isReg)
      setIsRegistered(info.isReg)
    } catch (error) {
      console.log(`Error occured while getting userInfo:${error}`)
    }
  }

  return (
    <>
      <div className=" flex  py-6 items-center h-[80vh] bg-gray-200">
        {isRegistered ? <Upload /> : <Register />}
      </div>
    </>
  )
}

export default Actions
