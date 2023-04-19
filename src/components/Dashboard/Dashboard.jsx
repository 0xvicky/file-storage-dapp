import React, { useState, useContext, useEffect } from "react"
import "./Dashboard.css"
import { Toast, toast } from "react-hot-toast"
import { ethers } from "ethers"
import { contractAddress, abi } from "../../utils/interface"
import UserContext from "../../context/User/UserContext"
import FileTable from "./FileTable"
const Dashboard = () => {
  const user = useContext(UserContext)

  const [fileArrLen, setFileArrLen] = useState(0)
  const [fileArr, setFileArr] = useState([])
  useEffect(() => {
    setFileArr([])
    const getData = async () => {
      const contract = new ethers.Contract(contractAddress, abi, user.signer)
      try {
        const fileLen = await contract.getFileLen()
        setFileArrLen(Number(fileLen))
        try {
          for (let i = 0; i < Number(fileLen); i++) {
            const getFiles = await contract.userToFile(user.userAddr, i)
            setFileArr((prev) => {
              return [...prev, getFiles]
            })
          }
        } catch (error) {
          console.log(`Error occured :${error}`)
        }
      } catch (error) {
        console.log(`Error occured, while fetching from contract:${error}`)
      }
    }
    getData()
  }, [user.userAddr])

  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString()
    return `${day}/${month}/${year}`
  }
  return (
    <>
      <div className="mx-auto mb-14">
        {fileArrLen > 0 ? (
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          #
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          FileId
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          FileName
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          FileType
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          IPFS Link
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-4">
                          Upload Date
                        </th>
                      </tr>
                    </thead>
                    {fileArr.map((item, index) => {
                      return (
                        <FileTable
                          key={index}
                          id={index + 1}
                          fileType={item.fileType}
                          fileName={item.fileName}
                          fileId={item.fileId}
                          fileSize={item.fileSize}
                          uploadDate={getDate(item.uploadDate)}
                          CID={item.fileURI}
                        />
                      )
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p class="text-2xl text-white  font-bold animate-pulse shadow-[#480048] shadow-2xl bg-gradient-to-r from-[#c04848] to-[#480048] rounded-md p-5 bg-white ">
            No File Uploaded Yet
          </p>
        )}
      </div>
    </>
  )
}

export default Dashboard
