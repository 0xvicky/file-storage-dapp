import React, { useState, useContext } from "react"
import { Web3Storage } from "web3.storage"
import "./Upload.css"
import { Toast, toast } from "react-hot-toast"
import { ethers } from "ethers"
import { contractAddress, abi } from "../../utils/interface"
import UserContext from "../../context/User/UserContext"
import { Link } from "react-router-dom"
const Upload = () => {
  const [file, setFile] = useState()
  const [fileType, setFileType] = useState()
  const [fileSize, setFileSize] = useState()
  const [fileName, setFileName] = useState()
  const [CID, setCID] = useState()
  const [URI, setURI] = useState()
  // const API_TOKEN = "api"
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMxMkY0MzE3MDFFNjk1YjQ4YjJmOTg5ZGFFQ0RBNkI5NGM1NjMyMDUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODAzNDkxODIwMTksIm5hbWUiOiJmaWxlLXN0ci1kYXBwLXRrbiJ9.7wn_WkvHkhmgbFbWsmBhF1--VpsSoSk5R1AC9LoeYHw"
  const client = new Web3Storage({ token: API_TOKEN })
  const user = useContext(UserContext)
  const handleIPFS = async (e) => {
    setFile(e.target.files[0])
    setFileType(e.target.files[0].type)
    setFileSize(e.target.files[0].size) //file size stored in KB
    setFileName(e.target.files[0].name)
    //File uploaded to IPFS
    try {
      const onRootCidReady = (rootCid) => {
        setURI()
        setCID(rootCid)
      }
      let file = e.target.files
      const rootCid = await client.put(file, {
        name: `${e.target.files[0].name}`,
        maxRetries: 2,
        onRootCidReady,
      })
      toast.success("Uploaded to IPFS")
    } catch (error) {
      console.log(`Error occured while uploading:${error}`)
      toast.error("Upload Error")
    }
  }
  const handleUpload = async () => {
    const contract = new ethers.Contract(contractAddress, abi, user.signer)
    try {
      const date = Math.floor(Date.now() / 1000)

      const upload = await contract.upload(fileType, fileSize, CID, fileName, date)
      await upload.wait()
      console.log(upload.hash)
      toast.success("Upload Success")
    } catch (error) {
      console.log(`Error occured while uploading file:${error}`)
    }
  }

  const test = () => {
    console.log(fileType, fileSize, CID, fileName)
  }
  return (
    <div>
      <button
        className="connBtn text-white mx-5 bg-black rounded-md p-3 font-semibold "
        onClick={handleUpload}>
        Upload
      </button>
      <input
        type="file"
        id="input"
        className="text-white mx-5 bg-black rounded-md p-3 font-semibold"
        onChange={handleIPFS}></input>
      <button
        className="connBtn text-white mx-5 bg-black rounded-md p-3 font-semibold "
        onClick={test}>
        Test{" "}
      </button>
      <button className=" text-white mx-5 bg-black rounded-md p-3 font-semibold">
        <Link to="/dashboard">Dashboard</Link>
      </button>
    </div>
  )
}

export default Upload
