import React from "react"

const FileTable = (props) => {
  function handleDownload(CID) {
    const URI = `https://${CID}.ipfs.dweb.link/${props.fileName}`
    console.log(URI)
    fetch(URI)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a")
        console.log(link)
        link.href = URL.createObjectURL(blob)
        link.download = props.fileName
        link.click()
      })
      .catch(console.error)
  }
  //   const fileDownload = async (CID) => {
  //     const url = `https://${CID}.ipfs.dweb.link/${props.fileName}`
  //     console.log(url)
  //     let fileName = url.split("/")[url.split("/").length - 1]
  //     let req = new XMLHttpRequest()
  //     req.open("GET", url, true)
  //     req.responseType = "blob"
  //     req.onload = function () {
  //       //Convert the Byte Data to BLOB object.
  //       var blob = new Blob([req.response], {
  //         type: "application/octetstream",
  //       })

  //       //Check the Browser type and download the File.
  //       var isIE = false || !!document.documentMode
  //       if (isIE) {
  //         window.navigator.msSaveBlob(blob, fileName)
  //       } else {
  //         var url = window.URL || window.webkitURL
  //         let link = url.createObjectURL(blob)
  //         var a = document.createElement("a")
  //         a.setAttribute("download", fileName)
  //         a.setAttribute("href", link)
  //         document.body.appendChild(a)
  //         a.click()
  //         document.body.removeChild(a)
  //       }
  //     }
  //     req.send()
  //   }

  return (
    <>
      <tbody>
        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
          <td class="whitespace-nowrap px-6 py-4 font-medium">{props.id}</td>
          {/* <td class="whitespace-nowrap px-6 py-4">{props.fileId}</td> */}
          <td class="whitespace-nowrap px-6 py-4">
            {" "}
            {`${props.fileId.slice(0, 8)}....${props.fileId.slice(-7, -1)}`}
          </td>
          <td class="whitespace-nowrap px-6 py-4">{props.fileName}</td>
          <td class="whitespace-nowrap px-6 py-4">{props.fileType}</td>
          <td class="whitespace-nowrap px-6 py-4">{props.uploadDate}</td>
          <td>
            <button
              className="text-white mx-5 bg-black rounded-md p-3 font-semibold"
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
