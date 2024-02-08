import React from "react";
import { useAuthcontext } from "../../context/AuthContext";
import useConversation from "../../zhustand/useConversation";
import { extractTime } from "../../../utils/extractTime";
import useListenMessages from "../../hooks/useListenMessages";

const Message = ({ message }) => {
  const { authUser } = useAuthcontext();
  const { selectedConversation } = useConversation();
  useListenMessages();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleColor = fromMe ? "bg-blue-500" : "";
  const shakeclass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white  ${bubbleColor} ${shakeclass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center pb-2">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
