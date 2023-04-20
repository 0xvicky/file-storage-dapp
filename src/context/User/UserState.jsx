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
  //  useEffect(() => {
  //     const getConnect = () => {
  //       const { ethereum } = window
  //       setIsMetamask(true)
  //       if (userAddr === undefined) {
  //         ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
  //           setUserAddr(res[0])
  //         })
  //       }
  //       const provider = new ethers.providers.Web3Provider(window.ethereum)
  //       const signer = provider.getSigner()
  //       setSigner(signer)
  //     }
  //     getConnect()
  //     const handleAddrChange = (accounts) => {
  //       setUserAddr(accounts[0])
  //     }
  //     const { ethereum } = window
  //     ethereum.on("accountsChanged", handleAddrChange)
  //   }, [isClicked])

  useEffect(() => {
    const getConnect = async () => {
      const { ethereum } = window
      setIsMetamask(Boolean(ethereum))

      if (ethereum && ethereum.chainId === "0x13881") {
        // Check if user is on Matic Mumbai Testnet
        return
      }

      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881", // Matic Mumbai Testnet chain ID
              chainName: "Matic Mumbai Testnet",
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
            },
          ],
        })
        // setIsMumbaiChainAdded(true)
      } catch (error) {
        console.error("Error adding Matic Mumbai Testnet to wallet:", error)
      }

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        })
      } catch (error) {
        console.error("Error switching to Matic Mumbai Testnet:", error)
      }
      if (userAddr === undefined) {
        try {
          const accounts = await ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setUserAddr(accounts[0])
          }
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          setSigner(signer)
        } catch (error) {
          console.error("Error getting user account:", error)
        }
      }
    }
    getConnect()

    const handleAccountsChanged = (accounts) => {
      setUserAddr(accounts[0])
    }

    const handleChainChanged = (chainId) => {
      console.log("Chain changed:", chainId)
    }

    const { ethereum } = window
    ethereum?.on("accountsChanged", handleAccountsChanged)
    ethereum?.on("chainChanged", handleChainChanged)

    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      ethereum?.removeListener("chainChanged", handleChainChanged)
    }
  }, [userAddr, signer])
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
