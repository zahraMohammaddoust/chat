
import React, { createContext, useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://172.20.10.2:7269/chatHub", {
        accessTokenFactory: () => localStorage.getItem("ticket"),
      })
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connected!");
        newConnection.on("ReceiveMessage", (userId, message, senderId) => {
        console.log("Message from user ID " + userId + ": " + message);
        console.log("Sender ID: " + senderId);
        });
      } catch (error) {
        console.error("SignalR Connection Error: ", error);
      }
    };

    startConnection();

    setConnection(newConnection);

    return () => newConnection.stop();
  }, []);

  return (
    <ChatContext.Provider value={connection}>{children}</ChatContext.Provider>
  );
};
