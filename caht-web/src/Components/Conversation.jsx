// Conversation.js
import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../Js/UseContext/ChatContext"; 
import "../Css/Conversation.css";

export default function Conversation(props) {
  const { contactUsersId } = props;
  const location = useLocation();
  const { conversation } = location.state || {};
  const [newMessage, setNewMessage] = useState("");
  const connection = useContext(ChatContext);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      await connection.invoke(
        "SendMessage",
        // ["2", "4"],
        null,
        newMessage,
        14
      );
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      {conversation &&
        conversation.length > 0 &&
        conversation.map((message, index) => (
          <div key={index} className="message-container">
            <p className="message-userid">{message.userId}</p>
            <p className="message-text">{message.messageText}</p>
          </div>
        ))}
      <div className="input-container clearfix">
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          className="send-button"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
