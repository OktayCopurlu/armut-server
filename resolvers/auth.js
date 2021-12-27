import transporter from "../email.js";
import createToken from "../jwt.js";

const PASSWORD_URL = "http://localhost:3000/reset_password";
const tokenTime = "4hr";
const secretKey = "thisismyuniqesecretkey";
export const authResolvers = {
  Mutation: {
    forgotPassword: async (_, { email }, { User }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User doesn't exist");
      }

      const token = createToken(user, secretKey, "1hr");
      const mailOptions = {
        from: "selimhalim12@gmail.com",
        to: email,
        subject: "New Password Link",
        html: `
        <h2>Please click on given link to reset your password.</h2>
        <a style="background-color:green;
        padding: 1rem;
        color: white;
        border-radius: 4px;
        text-align: center;" href=${PASSWORD_URL}/${token}>Reset Password</a>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return { token };
    },
    resetPassword: async (
      _,
      { email, RESET_PASSWORD_KEY, token, password },
      { User }
    ) => {
      const isValid = jwt.verify(token, RESET_PASSWORD_KEY);
      if (!isValid) {
        throw new Error("Token is not valid");
      }
      const user = await User.findOneAndUpdate(
        { email },
        { password },
        { new: true }
      );
      if (user) {
        return { token };
      } else {
        return new Error("Email does not exist");
      }
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
  },
};
