export const otherQueries = {
    Query: {
      getAsked_service: async (_, { category }, { Asked_service }) => {
        const askedService = await Asked_service.find({ category });
        return askedService;
      },
  
      getUserRezervations: async (_, { _id }, { User }) => {
        const rezervations = await User.findById({ _id }).populate(
          "asked_service"
        );
        return rezervations.asked_service;
      },
      getOffer: async (_, { bidderID }, { Given_Offer }) => {
        const offers = await Given_Offer.find({ bidderID });
        return offers;
      },
      getRezervationsOffers: async (_, { _id }, { Asked_service }) => {
        const offers = await Asked_service.findById({ _id }).populate("offer");
        return offers.offer;
      },
    },
  

  };
  