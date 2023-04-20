import React, { useState, useContext } from "react"
import { Web3Storage } from "web3.storage"
import "./Upload.css"
import { Toast, toast } from "react-hot-toast"
import { ethers } from "ethers"
import { contractAddress, abi } from "../../utils/interface"
import UserContext from "../../context/User/UserContext"
import { Link } from "react-router-dom"
const Upload = () => {
  const [fileType, setFileType] = useState()
  const [fileSize, setFileSize] = useState()
  const [fileName, setFileName] = useState()
  const [CID, setCID] = useState()
  const [isUpload, setIsUpload] = useState(false)

  // const API_TOKEN = "api"
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMkY0MzE3MDFFNjk1YjQ4YjJmOTg5ZGFFQ0RBNkI5NGM1NjMyMDUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODAzNDkxODIwMTksIm5hbWUiOiJmaWxlLXN0ci1kYXBwLXRrbiJ9.7wn_WkvHkhmgbFbWsmBhF1--VpsSoSk5R1AC9LoeYHw"
  const client = new Web3Storage({ token: API_TOKEN })
  const user = useContext(UserContext)
  const handleIPFS = async (e) => {
    setIsUpload(false)
    toast.loading("Processing...")
    setFileType(e.target.files[0].type)

    setFileSize(e.target.files[0].size) //file size stored in KB
    setFileName(e.target.files[0].name)
    //File uploaded to IPFS
    try {
      const onRootCidReady = (rootCid) => {
        setCID(rootCid)
      }
      let file = e.target.files
      const rootCid = await client.put(file, {
        name: `${e.target.files[0].name}`,
        maxRetries: 2,
        onRootCidReady,
      })
      toast.dismiss()
      setIsUpload(true)
      toast.success("Ready To Upload")
    } catch (error) {
      console.log(`Error occured while uploading:${error}`)
      toast.error("Upload Error")
      toast.dismiss()
    }
  }

  const handleUpload = async () => {
    toast.loading("Uploading...")
    const contract = new ethers.Contract(contractAddress, abi, user.signer)
    try {
      const date = Math.floor(Date.now() / 1000)

      const upload = await contract.upload(fileType, fileSize, CID, fileName, date)
      await upload.wait()
      console.log(upload.hash)
      toast.dismiss()
      toast.success(`${upload.hash.slice(0, 8)}....${upload.hash.slice(-7, -1)}`)
      toast.success("File Uploaded")
    } catch (error) {
      console.log(`Error occured while uploading file:${error}`)
      toast.error("Uploading Failed")
    }
  }

  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-24">
      <button className=" text-white w-fit mx-5 bg-gradient-to-r from-[#c04848] to-[#480048] shadow-2xl shadow-[#480048] rounded-md p-5 text-2xl self-end font-semibold">
        <Link to="/dashboard">Dashboard</Link>
      </button>
      <div className="flex">
        {isUpload && (
          <button
            className="connBtn text-white mx-5 p-5 text-2xl bg-gradient-to-bl from-[#c04848] to-[#480048] rounded-md  font-semibold "
            onClick={handleUpload}>
            Upload
          </button>
        )}

        <input
          type="file"
          id="input"
          className="text-white mx-5 p-5 text-2xl  bg-gradient-to-tr from-[#c04848] to-[#480048] rounded-md shadow-2xl shadow-[#480048] font-semibold"
          onChange={handleIPFS}></input>
      </div>
    </div>
  )
}

export default Upload
