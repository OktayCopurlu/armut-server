export const messageResolvers = {
  Query: {
    getUserMessages: async (_, { _id }, { User }) => {
      const messages = await User.findById({ _id }).populate("messages");
      return messages.messages;
    },

    getOfferMessages: async (_, { _id }, { Given_Offer }) => {
      const offer = await Given_Offer.findById({ _id }).populate("message");
      return offer.message;
    },
  },

  Mutation: {
    createMessage: async (
      _,
      { price, message, senderID, receiverID, asked_service_id },
      { Message, User, Given_Offer }
    ) => {
      const newMessage = await new Message({
        price,
        message,
        senderID,
        receiverID,
        asked_service_id,
      }).save();
      await User.findOneAndUpdate(
        { _id: senderID },
        { $addToSet: { messages: newMessage._id } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: receiverID },
        { $addToSet: { messages: newMessage._id } },
        { new: true }
      );
      if (asked_service_id) {
        await Given_Offer.findOneAndUpdate(
          { serviceID: asked_service_id },
          { $addToSet: { message: newMessage._id } },
          { new: true }
        );
      }
      return newMessage;
    },
  },
};
