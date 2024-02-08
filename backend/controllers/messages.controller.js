import ConversationModel from "../models/conversation.model.js";
import MessageModal from "../models/messages.modal.js";
import { getReciverSocketId, io } from "./../socket/socket.js";

export default class MessageController {
  sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id: reciverId } = req.params;
      const senderId = req.user._id;

      let converstaion = await ConversationModel.findOne({
        participants: { $all: [senderId, reciverId] },
      });
      if (!converstaion) {
        converstaion = await ConversationModel.create({
          participants: [senderId, reciverId],
        });
      }

      const newMessage = new MessageModal({
        senderId,
        reciverId,
        message,
      });

      if (newMessage) {
        converstaion.messages.push(newMessage._id);
      }

      // await converstaion.save();
      // await newMessage.save();

      // this will run in parallel
      await Promise.all([converstaion.save(), newMessage.save()]);

      // * SOCKET IO FUNCTIONALITY

      const reciverSockedId = getReciverSocketId(reciverId);
      if (reciverSockedId) {
        io.to(reciverSockedId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };

  getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;
      const conversation = await ConversationModel.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages");
      if (!conversation) {
        return res.status(404).json([]);
      }
      const messages = conversation.messages;
      return res.status(200).json(messages);
    } catch (error) {
      console.log("error in getMessage controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
