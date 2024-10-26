import React from 'react';
import user from '../../assets/avatar.svg';
import p1 from '../../assets/Aakash.jpeg';
import p2 from '../../assets/shubham.jpg';
import p3 from '../../assets/kishan.jpeg';

const ChatItem = ({ imgSrc, name, message }) => (
  <div className='flex items-center gap-4 p-5 text-white cursor-pointer hover:bg-gray-800'>
    <img className='w-12 h-12 object-cover rounded-full' src={imgSrc} alt={name} />
    <div>
      <span className='text-[15px]'>{name}</span>
      <p className='text-[12px] font-extralight text-gray-200 font-rubik'>{message}</p>
    </div>
  </div>
);

export const Chats = () => {
  const chatData = [
    { imgSrc: user, name: 'Shubham Verma', message: 'Thank you' },
    { imgSrc: p1, name: 'Aakash Choudhary', message: 'Bhai mera saman dede' },
    { imgSrc: p2, name: 'Shubham Verma', message: 'Thank you' },
    { imgSrc: p3, name: 'Kailash Kher', message: 'Saiyaaaaaaan' },
    { imgSrc: p3, name: 'Kailash Kher', message: 'Saiyaaaaaaan' },
    { imgSrc: p3, name: 'Kailash Kher', message: 'Saiyaaaaaaan' },
    { imgSrc: p3, name: 'Kailash Kher', message: 'Saiyaaaaaaan' },
    { imgSrc: p3, name: 'Kailash Kher', message: 'Saiyaaaaaaan' },
  ];

  return (
    <div className='overflow-y-auto h-[430px] 2xl:h-[680px] scrollbar scrollbar-hidden'>
      {chatData.map((chat, index) => (
        <ChatItem key={index} imgSrc={chat.imgSrc} name={chat.name} message={chat.message} />
      ))}
    </div>
  );
};
