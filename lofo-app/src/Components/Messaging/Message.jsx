import React from 'react';
import p1 from '../../assets/Avatar.svg';

export const Message = ({ text, isSentByUser }) => {
  return (
    <div className={`flex gap-2 items-center mb-4 p-2 rounded-lg ${isSentByUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-100 text-gray-800'} transition duration-200`}>
      {!isSentByUser && <img className="w-10 h-10 rounded-full" src={p1} alt="User Avatar" />}
      <p className="text-sm leading-tight">{text}</p>
    </div>
  );
};
