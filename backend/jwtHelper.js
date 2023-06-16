import jwt from "jsonwebtoken";

const jwtToken = ({ uid, name, email }) => {
  const user = { uid, name, email };
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export { jwtToken };
