import React from "react";

const conversations = {
  person1: [
    { sender: "you", message: "Hello, it's me." },
    { sender: "you", message: "I was wondering..." },
  ],
  person2: [
    { sender: "you", message: "Hello, can you hear me?" },
    { sender: "me", message: "... about who we used to be." },
    { sender: "me", message: "Are you serious?" },
  ],
  // Add more conversations as needed
};

const ChatWindow = ({ activeChat }) => {
  const conversation = conversations[activeChat] || [];

  return (
    <div className="w-3/5 flex flex-col">
      <div className="bg-gray-200 p-4">
        <span className="text-gray-600">
          To: <span className="font-semibold">Dog Woofson</span>
        </span>
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        {conversation.map((bubble, index) => (
          <div
            key={index}
            className={`bubble p-4 rounded-lg mb-3 max-w-lg ${
              bubble.sender === "you"
                ? "bg-blue-500 text-white self-start"
                : "bg-gray-200 self-end"
            }`}
          >
            {bubble.message}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-100 flex items-center border-t">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Type a message"
        />
        <button className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;