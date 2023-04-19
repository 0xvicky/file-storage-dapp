export const contractAddress = "0x02eCBE87e7AC58Eb260eBFacFDaEbAbf84E5A09c"
export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amt",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "InvalidAmt",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "InvalidSender",
    type: "error",
  },
  {
    inputs: [],
    name: "register",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_fileType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_fileSize",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_fileURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "_fileName",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_uploadDate",
        type: "uint256",
      },
    ],
    name: "upload",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "adminToDashboard",
    outputs: [
      {
        internalType: "uint256",
        name: "totalFiles",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalUsers",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "adminToUser",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFileLen",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPLOAD_AMT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "bool",
        name: "isReg",
        type: "bool",
      },
      {
        internalType: "bytes20",
        name: "userId",
        type: "bytes20",
      },
      {
        internalType: "uint256",
        name: "fileCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userToFile",
    outputs: [
      {
        internalType: "string",
        name: "fileType",
        type: "string",
      },
      {
        internalType: "string",
        name: "fileName",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "fileSize",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "fileURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "fileNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "uploadDate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
