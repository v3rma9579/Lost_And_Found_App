import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../HomePage/firebase";

export const Messages = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    const chatsQuery = query(
      collection(db, "chats"),
      where("senderId", "in", [auth.currentUser.uid, selectedUser.uid]),
      where("receiverId", "in", [auth.currentUser.uid, selectedUser.uid])
    );

    const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, "chats"), {
        senderId: auth.currentUser.uid,
        receiverId: selectedUser.uid,
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === auth.currentUser.uid ? "sent" : "received"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
