import React from "react";

const people = [
  {
    id: "person1",
    name: "Thomas Bangalter",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg",
    time: "2:09 PM",
    preview: "I was wondering...",
  },
  {
    id: "person2",
    name: "Dog Woofson",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png",
    time: "1:44 PM",
    preview: "I've forgotten how it felt before",
  },
  // Add more people as needed
];

const ChatList = ({ activeChat, handleChatChange }) => {
  return (
    <div className="w-2/5 border-r border-gray-300">
      <div className="p-5 border-b border-gray-300 flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-3/4 px-4 py-2 border rounded-lg"
        />
        <button className="ml-2 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
          🔍
        </button>
      </div>
      <ul className="overflow-y-auto h-full">
        {people.map((person) => (
          <li
            key={person.id}
            className={`p-4 cursor-pointer flex items-center ${
              activeChat === person.id ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleChatChange(person.id)}
          >
            <img
              src={person.img}
              alt={person.name}
              className="h-10 w-10 rounded-full mr-4"
            />
            <div className="flex-grow">
              <span className="block font-semibold">{person.name}</span>
              <span className="block text-gray-500 text-sm">{person.preview}</span>
            </div>
            <span className="text-sm text-gray-400">{person.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;