import React, { useState, useEffect } from "react"
import UserContext from "./UserContext"
import toast, { Toaster } from "react-hot-toast"
const ethers = require("ethers")

const UserState = (props) => {
  const [userAddr, setUserAddr] = useState()
  const [signer, setSigner] = useState()
  const [isClicked, setIsClicked] = useState(false)
  const [isMetamask, setIsMetamask] = useState()
  const [isRegChange, setIsRegChange] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isRegistered, setIsRegistered] = useState()
  useEffect(() => {
    const getConnect = () => {
      const { ethereum } = window
      setIsMetamask(true)
      if (userAddr === undefined) {
        ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
          setUserAddr(res[0])
        })
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      setSigner(signer)
    }
    getConnect()
    const handleAddrChange = (accounts) => {
      setUserAddr(accounts[0])
    }
    const { ethereum } = window
    ethereum.on("accountsChanged", handleAddrChange)
  }, [isClicked])

  return (
    <>
      <UserContext.Provider
        value={{
          userAddr,
          isClicked,
          setIsClicked,
          isMetamask,
          signer,
          isRegChange,
          setIsRegChange,
          isConnected,
          isRegistered,
          setIsRegistered,
        }}>
        {props.children}
      </UserContext.Provider>
    </>
  )
}

export default UserState
