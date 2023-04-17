export const contractAddress = '0x97100655c808D65eF0215090348F90a03186a38a';
export const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'AlreadyRegistered',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'InvalidAmt',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OWNER',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UPLOAD_AMT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'adminToDashboard',
    outputs: [
      {
        internalType: 'uint256',
        name: 'totalFiles',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalUsers',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'adminToUser',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'register',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_fileType',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_fileSize',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_fileURI',
        type: 'string',
      },
    ],
    name: 'upload',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'bool',
        name: 'isReg',
        type: 'bool',
      },
      {
        internalType: 'bytes20',
        name: 'userId',
        type: 'bytes20',
      },
      {
        internalType: 'uint256',
        name: 'fileCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userToFile',
    outputs: [
      {
        internalType: 'string',
        name: 'fileType',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'fileId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'fileSize',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'fileURI',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'fileNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];
