import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Empty token" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ error: error.message });
    }
    req.user = user;
    next();
  });
};

export { authenticateToken };
