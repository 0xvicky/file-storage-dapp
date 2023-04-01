import React from "react";
import "./App.css";
import { Navbar, Actions } from "./containers";
import UserState from "./context/User/UserState";

function App() {
  return (
    <>
      <UserState>
        <Navbar />
        <Actions />
      </UserState>{" "}
    </>
  );
}

export default App;
