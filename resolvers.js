import jwt from "jsonwebtoken";

const tokenTime = "4hr";
const secretKey = "thisismyuniqesecretkey";
const createToken = (user, secret, expiresIn) => {
  const { fullname, email, _id, address, tel, photo, provider, category } =
    user;
  return jwt.sign(
    { fullname, email, _id, address, tel, photo, provider, category },
    secret,
    {
      expiresIn,
    }
  );
};

export const resolvers = {
  Query: {
    getUserInfo: async (_, { _id }, { User }) => {
      const user = await User.findById(_id);
      return user;
    },
    getUsers: async (_, args, { User }) => {
      const users = await User.find();
      return users;
    },
    getAllCategories: async (_, args, { AllCategories }) => {
      const allCategories = await AllCategories.find();
      return allCategories;
    },
    getServiceCategory: async (_, mainCategory, { ServiceCategory }) => {
      const category = await ServiceCategory.find(mainCategory);
      return category;
    },
    getAsked_service: async (_, { category }, { Asked_service }) => {
      const askedService = await Asked_service.find({ category });
      return askedService;
    },
    getCantons: async (_, args, { Canton }) => {
      const cantons = await Canton.find();
      return cantons;
    },
    getCities: async (_, { canton }, { Canton }) => {
      const cities = await Canton.find({ canton });
      return cities;
    },
    getUserMessages: async (_, { _id }, { User }) => {
      const messages = await User.findById({ _id }).populate("messages");
      return messages.messages;
    },
  },

  Mutation: {
    createMessage: async (
      _,
      { price, message, senderID, receiverID, asked_service_id },
      { Message, User }
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
        await User.findOneAndUpdate(
          { _id: senderID },
          { $addToSet: { given_offer: asked_service_id } },
          { new: true }
        );
      }
      return newMessage;
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

    setUpCanton: async (_, { canton, gemainde }, { Canton }) => {
      const cantons = await new Canton({
        canton,
        gemainde,
      }).save();
      return cantons;
    },

    setUpCategories: async (_, { name, categories }, { AllCategories }) => {
      await new AllCategories({
        name,
        categories,
      }).save();
      return {
        AllCategories,
      };
    },

    login: async (_, { email, password }, { User }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      } else if (password !== user.password) {
        throw new Error("Invalid Password");
      }
      return {
        token: createToken(user, secretKey, tokenTime),
      };
    },

    register: async (
      _,
      { fullname, email, password, category, status, address, tel, provider },
      { User, ServiceCategory, AllCategories }
    ) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Service User already exist");
      }
      const newUser = await new User({
        fullname,
        email,
        password,
        category,
        status,
        address,
        tel,
        provider,
      }).save();
      if (provider) {
        const existCategory = await ServiceCategory.findOneAndUpdate(
          { category },
          { $addToSet: { users: newUser._id } },
          { new: true }
        );

        if (!existCategory) {
          const allCategories = await AllCategories.find();
          let mainCategory;
          for (let index = 0; index < allCategories.length; index++) {
            const element = allCategories[index];
            const categories = element.categories;
            categories.forEach((ctg) => {
              if (ctg == category) {
                mainCategory = element.name;
              }
            });
          }

          const users = [newUser._id];
          await new ServiceCategory({
            mainCategory,
            category,
            users,
          }).save();
        }
      }
      return {
        token: createToken(newUser, secretKey, tokenTime),
      };
    },

    editUser: async (_, { address, email, fullname, tel, _id }, { User }) => {
      const newInfo = {
        address,
        email,
        fullname,
        tel,
        _id,
      };

      const user = await User.findByIdAndUpdate(_id, newInfo, {
        new: true,
      });

      return { token: createToken(user, secretKey, tokenTime) };
    },
    addPhoto: async (_, { _id, photo }, { User }) => {
      const user = await User.findByIdAndUpdate(
        _id,
        { photo },
        {
          new: true,
        }
      );
      return { token: createToken(user, secretKey, tokenTime) };
    },
  },
};
