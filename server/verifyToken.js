import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new Error("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_KEY, function (err, data) {
    if (err) {
      throw new Error("You are not authorized!");
    }
    req.user = data;
    next();
  });
};
