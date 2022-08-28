import jwt from "jsonwebtoken";
import authConfig from "../config/auth";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ error: "Token not provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.json({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer/.test(scheme)) {
    return res.json({ error: "Token malformed" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.json({ error: "Token invalid" });
    }

    req.userId = decoded.userId;
    return next();
  });
};
