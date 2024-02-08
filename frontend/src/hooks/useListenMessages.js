import { useEffect } from "react";
import { useSocketContext } from "../context/socketContex";
import useConversation from "../zhustand/useConversation";
import notificationSound from "../assets/snotification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      setMessages([...messages, newMessage]);
      sound.play();
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
