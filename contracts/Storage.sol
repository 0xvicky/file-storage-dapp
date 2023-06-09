//SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

contract Storage{
    struct AdminDashboard{
        uint256 totalFiles;
        uint256 totalUsers;
    }
    struct User{
        bool isReg;
        bytes20 userId;
        uint256 fileCount;
    }
    struct File{
        string fileType;
        string fileName;
        bytes32 fileId;
        uint256 fileSize;
        string fileURI;
        uint256 fileNumber;
        uint256 uploadDate;
    }
    address public immutable OWNER;
    uint256 public immutable UPLOAD_AMT;
    constructor(uint256 _amt){
        OWNER = msg.sender;
        UPLOAD_AMT = _amt;
    }
    receive() payable external{}
    mapping(address=>User) public userInfo;
    mapping(address=>address[]) public adminToUser;
    mapping(address=>AdminDashboard) public adminToDashboard;
    mapping(address=>File[]) public userToFile;
    
    error InvalidSender(address);
    error InvalidAmt(uint256);

    function register() external payable returns(bool){
        if(userInfo[msg.sender].isReg){
         revert InvalidSender(msg.sender);
        }
        if(msg.value!= UPLOAD_AMT){
            revert InvalidAmt(msg.value);
        }
    userInfo[msg.sender] = User({
        isReg:true,
        userId:ripemd160(abi.encodePacked(msg.sender)),
        fileCount:0
    });
    adminToUser[OWNER].push(msg.sender);
    adminToDashboard[OWNER].totalUsers++;
    return true;
    }
   function getFileLen() public view returns(uint256){
       if(!userInfo[msg.sender].isReg){
           revert InvalidSender(msg.sender);
       }
       return userToFile[msg.sender].length;
   }
   function genFileId(uint256 _fileNum) internal view returns(bytes32){
       bytes32 fileId = keccak256(abi.encodePacked(msg.sender,_fileNum,block.timestamp));
       return fileId;
   }

   function upload(string memory _fileType, uint256 _fileSize, string memory _fileURI, string memory _fileName, uint256 _uploadDate) external returns(bool){
      if(!userInfo[msg.sender].isReg){
         revert InvalidSender(msg.sender);
        }
   userInfo[msg.sender].fileCount++;
   uint256 _fileNum = userInfo[msg.sender].fileCount;
   File memory newFile = File({
       fileType:_fileType,
       fileId: genFileId(_fileNum),
       fileSize:_fileSize,
       fileURI:_fileURI,
       fileNumber:_fileNum,
       fileName:_fileName,
       uploadDate:_uploadDate
   });
 userToFile[msg.sender].push(newFile);
 adminToDashboard[OWNER].totalFiles++;
 return true;
   }

}