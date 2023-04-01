import React from "react";
import "./Register.css";
import ethers from "ethers";

const Register = () => {
  const handleRegister = async () => {
    const { ethereum } = window;
    const chain = Number(await ethereum.request({ method: "eth_chainId" }));
    console.log(chain);
    console.log(ethereum.chainId);
  };
  return (
    <>
      <button
        className="connBtn text-white bg-black rounded-md p-3 font-semibold "
        onClick={handleRegister}
      >
        Register
      </button>
    </>
  );
};

export default Register;
