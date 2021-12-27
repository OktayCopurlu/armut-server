export const otherMutations = {
  Mutation: {
    createOffer: async (
      _,
      { price, clientID, bidderID, serviceID },
      { Given_Offer, User, Asked_service }
    ) => {
      const offer = await new Given_Offer({
        price,
        clientID,
        bidderID,
        serviceID,
      }).save();
      await User.findOneAndUpdate(
        { _id: bidderID },
        { $addToSet: { given_offer: offer._id } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: bidderID },
        { $addToSet: { given_offer_service: serviceID } },
        { new: true }
      );
      await Asked_service.findByIdAndUpdate(
        { _id: serviceID },
        { $addToSet: { offer: offer._id } },
        { new: true }
      );

      return offer;
    },

    createAsked_service: async (
      _,
      {
        fullname,
        email,
        tel,
        canton,
        city,
        date,
        message,
        category,
        asked_service_user,
      },
      { Asked_service, User }
    ) => {
      const asked_service = await new Asked_service({
        fullname,
        email,
        tel,
        canton,
        city,
        date,
        message,
        category,
        asked_service_user,
      }).save();

      await User.findOneAndUpdate(
        { _id: asked_service_user },
        { $addToSet: { asked_service: asked_service._id } },
        { new: true }
      );
      return asked_service;
    },
  },
};
