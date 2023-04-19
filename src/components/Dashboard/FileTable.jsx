import React from "react"
import { Toast, toast } from "react-hot-toast"
const FileTable = (props) => {
  function handleDownload(CID) {
    try {
      toast.loading("Downloading...")
      const URI = `https://${CID}.ipfs.dweb.link/${props.fileName}`
      //   console.log(URI)
      fetch(URI)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a")
          //   console.log(link)
          link.href = URL.createObjectURL(blob)
          link.download = props.fileName
          link.click()
          toast.dismiss()
          toast.success("Ready To Download !")
        })
        .catch(console.error)
    } catch (error) {
      console.log(`Error while donwloading...:${error}`)
      toast.error("Download Failed")
    }
  }

  return (
    <>
      <tbody className="">
        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-[#480048] dark:hover:bg-[#3e0a3e] dark:hover:text-white">
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">{props.id}</td>
          {/* <td class="whitespace-nowrap px-6 py-4">{props.fileId}</td> */}
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">
            {" "}
            {`${props.fileId.slice(0, 8)}....${props.fileId.slice(-7, -1)}`}
          </td>
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">
            {props.fileName}
          </td>
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">
            {props.fileType}
          </td>
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">
            <a
              href={`https://${props.CID}.ipfs.dweb.link`}
              target="_blank">
              <p className=""> Click Here</p>
            </a>
          </td>
          <td class="whitespace-nowrap px-6 py-4 font-bold text-base">
            {props.uploadDate}
          </td>
          <td>
            <button
              className="text-white mx-5 bg-gradient-to-br from-[#c04848] to-[#480048] shadow-2xl  shadow-[#480048] rounded-md p-3 font-semibold"
              onClick={() => {
                handleDownload(props.CID)
              }}>
              Download
            </button>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default FileTable
