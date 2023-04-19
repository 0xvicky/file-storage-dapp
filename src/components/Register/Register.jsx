import React, { useContext } from "react"
import "./Register.css"
import { ethers } from "ethers"
import toast, { Toaster } from "react-hot-toast"
import { abi, contractAddress } from "../../utils/interface"
import UserContext from "../../context/User/UserContext"
const Register = () => {
  //context
  const user = useContext(UserContext)

  //functions
  const handleRegister = async () => {
    const contract = new ethers.Contract(contractAddress, abi, user.signer)
    const amt = ethers.utils.parseUnits("1000", "wei")
    try {
      const reg = await contract.register({ value: amt })
      await reg.wait()
      console.log(`Tx hash:${reg.hash}`)
      toast.success("Registeration Success")
      toast.success(`${reg.hash.slice(0, 6)}....${reg.hash.slice(-4)}`)
      user.setIsRegChange((prev) => {
        return !prev
      })
    } catch (error) {
      toast.error("Try Again")
      console.log(`Error occured:${error}`)
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex justify-center w-full">
        <button
          className="connBtn  text-white bg-gradient-to-br from-[#c04848] to-[#480048] rounded-md p-10 text-4xl font-semibold "
          onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  )
}

export default Register
