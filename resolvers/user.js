import createToken from "../jwt.js";
const tokenTime = "4hr";
const secretKey = "thisismyuniqesecretkey";

export const userResolvers = {
  Query: {
    getUserInfo: async (_, { _id }, { User }) => {
      const user = await User.findById(_id);
      return user;
    },
    getUsers: async (_, args, { User }) => {
      const users = await User.find();
      return users;
    },
  },

  Mutation: {
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
