import React, { useState, useEffect } from "react"
import UserContext from "./UserContext"
const ethers = require("ethers")

const UserState = (props) => {
  const [userAddr, setUserAddr] = useState()
  const [signer, setSigner] = useState()
  const [isClicked, setIsClicked] = useState(false)
  const [isMetamask, setIsMetamask] = useState()
  const [isChainChanged, setIsChainChanged] = useState(false)
  const [isRegChange, setIsRegChange] = useState(false)

  useEffect(() => {
    if (isClicked) {
      const getAddress = async () => {
        const { ethereum } = window

        if (ethereum) {
          setIsMetamask(true)
          if (Number(ethereum.chainId) !== 80001) {
            try {
              await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13881" }],
              })
            } catch (error) {
              console.log(error)
            }
          }
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const signerAddr = await signer.getAddress()
          setSigner(signer)
          setUserAddr(signerAddr)
          setIsChainChanged(true)
        } else {
          setIsMetamask(false)
        }
      }
      getAddress()
      const handleAddrChange = (accounts) => {
        setUserAddr(accounts[0])
      }

      const { ethereum } = window
      ethereum.on("accountsChanged", handleAddrChange)
    }
  }, [isClicked, isChainChanged])

  return (
    <>
      <UserContext.Provider
        value={{
          userAddr,
          isClicked,
          setIsClicked,
          isMetamask,
          isChainChanged,
          signer,
          isRegChange,
          setIsRegChange,
        }}>
        {props.children}
      </UserContext.Provider>
    </>
  )
}

export default UserState
