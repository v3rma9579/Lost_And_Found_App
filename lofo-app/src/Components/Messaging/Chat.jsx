import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

export const Chat = () => {
  const [activeChat, setActiveChat] = useState("person2");

  const handleChatChange = (person) => {
    setActiveChat(person);
  };

  return (
    <div className="ml-[200px]  flex justify-center items-center h-screen bg-gray-100">
      <div className="wrapper flex w-4/5 h-3/4 bg-white">
        <ChatList activeChat={activeChat} handleChatChange={handleChatChange} />
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
};