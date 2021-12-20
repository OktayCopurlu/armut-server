import jwt from "jsonwebtoken";

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
const tokenTime = "4hr";
const secretKey = "thisismyuniqesecretkey";
export const resolvers = {
  Query: {
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
    getOpportunity: async (_, { category }, { Asked_service }) => {
      const opportunity = await Asked_service.find({ category });
      return opportunity;
    },
    getCantons: async (_, args, { Canton }) => {
      const cantons = await Canton.find();
      return cantons;
    },
    getCities: async (_, { canton }, { Canton }) => {
      const cities = await Canton.find({ canton });
      return cities;
    },
    getUserMessages: async (_, { userID }, { Message }) => {
      const messages = await Message.find({ userID });
      return messages;
    },
  },
  Mutation: {
    createMessage: async (_, payload, { Message }) => {
      const message = await new Message(payload).save();
      return message;
    },

    createAsked_service: async (
      _,
      { canton, city, date, more_info, category, asked_service_user },
      { Asked_service }
    ) => {
      const asked_service = await new Asked_service({
        canton,
        city,
        date,
        more_info,
        category,
        asked_service_user,
      }).save();

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
