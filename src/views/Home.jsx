import React from "react";
import Navbar from "../components/Layout/Navbar";
import HomeFrame from "../components/Layout/HomeFrame";
export default function Home() {
  return (
    <div className="Home">
      <div>
        <Navbar />
        <HomeFrame />
      </div>
    </div>
  );
}
