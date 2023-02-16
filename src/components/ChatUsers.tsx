import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import ChatUser from "./ChatUser";

const ChatUsers: React.FC = () => {
  const [chats, setChats] = useState([]);

  const currentUser = auth.currentUser;

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser!.uid),
        (doc: any) => { 
          setChats(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser!.uid && getChats();
  }, [currentUser!.uid]);

  return (
    <div>
      {Object.entries(chats)
        .sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <ChatUser chat={chat} />
        ))}
    </div>
  );
};

export default ChatUsers;
