import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
const ChatHub = () => {
  // eslint-disable-next-line no-use-before-define
  var Config = config(); // eslint-disable-line

  const [states, setStates] = useState({
    connection: null,
    });
    
    useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl("https://172.20.10.2:7269/chatHub", {
    accessTokenFactory: () => localStorage.getItem("ticket"),
    })
    .withAutomaticReconnect()
    .build();
    
    setStates((prevState) => ({ ...prevState, connection: newConnection }));
    window.connection = newConnection;
    
    const startConnection = async () => {
    try {
    await newConnection.start();
    console.log("Connected!");
    newConnection.on("ReceiveMessage", (userId, message, senderId) => {
    console.log("Message from user ID " + userId + ": " + message);
    console.log("Sender ID: " + senderId);
    });
    } catch (e) {
    console.error("Connection failed: ", e);
    }
    };
    
    startConnection();
    
    // Cleanup on dismount
    return () => newConnection.stop();
    }, []); // Empty array ensures this effect runs only once
  return <div> {} </div>;
};
export default ChatHub;
