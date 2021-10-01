import jwt from "jsonwebtoken";

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    const [, token] = authorization.split(" ");

    const { userId } = jwt.verify(token, "secret");

    req.userId = userId;

    next();
  } catch (error) {
    // invalid signature
    res.status(401).send({ auth: false, message: "Token invalid." });
  }
}

export default { isAuthenticated };