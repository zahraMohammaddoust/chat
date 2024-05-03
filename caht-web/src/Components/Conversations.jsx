import { useEffect, useState } from "react";
import {
  useIsLoading,
  useSetIsLoading,
} from "../Js/UseContext/LoaadingContext";
import { CallService, modalAlert } from "../Js/Script";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import "../Css/Conversations.css";
export default function Conversations() {
  const setIsLoading = useSetIsLoading();
  const IsLoading = useIsLoading();
  const navigate = useNavigate();
  const [states, setStates] = useState({
    conversations: "",
  });
  useEffect(() => {
    CallService(
      "ConversationUser/GetUserMessages",
      {},
      "GET",
      setIsLoading,
      true
    )
      .then((messages) => {
        const groupedMessages = messagesGroupByConversationId(
          messages,
          (message) => message.conversationId
        );
        setStates((prevStates) => ({
          ...prevStates,
          conversations: groupedMessages,
        }));
      })
      .catch((error) => {
        modalAlert(
          error.message ||
            error ||
            "An unexpected error has occurred. Please contact software support"
        );
      });
  }, []);
  function messagesGroupByConversationId(iterable, keyFn) {
    const result = {};
    for (const item of iterable) {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
    return Object.values(result);
  }

  return (
    <div>
      {IsLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}
      {states.conversations &&
        states.conversations.length > 0 &&
        states.conversations.map((conversation, index) => {
          return (
            <div
              key={index}
              className="conversation-item"
              onClick={() => {
                var x = states.conversations;
                navigate(process.env.PUBLIC_URL + "/Conversation", {
                  state: { conversation },
                });
              }}
            >
              <p>{conversation[0].conversationName}</p>
            </div>
          );
        })}
    </div>
  );
}
