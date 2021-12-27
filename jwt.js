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
export default createToken;
