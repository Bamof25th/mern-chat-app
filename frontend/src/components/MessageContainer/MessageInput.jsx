import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";
import { MdInsertEmoticon } from "react-icons/md";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [emojie, setEmojie] = useState(true);
  const { loading, sendMessage } = useSendMessage();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  const handelEmojieSubmit = async (e) => {
    e.preventDefault();
    if (!emojie) return;
  };

  return (
    <form className="px-4 my-3 " onSubmit={handelSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend className="w-6 h-6 " />
          )}
        </button>
        <button
          onClick={handelEmojieSubmit}
          className="absolute inset-y-0 end-8 flex items-center pe-3"
        >
          <div className="flex">
            <MdInsertEmoticon
              className="w-6 h-6"
              onClick={() => setEmojie(!emojie)}
            />
          </div>
          {!emojie ? (
            <EmojiPicker
              emojiStyle="google"
              onEmojiClick={(e) => setMessage((input) => input + e.emoji)}
              theme="dark"
            />
          ) : (
            ""
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
