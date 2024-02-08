import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

const Home = () => {
  return (
    <div className="flex max-sm:h-[600px] sm:h-[450px] md:h-[550px] sm rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
