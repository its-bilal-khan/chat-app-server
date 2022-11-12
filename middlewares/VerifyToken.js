import jwt from 'jsonwebtoken';

export const verifyTokenMiddleWare = function (req, res, next) {
  if (req.originalUrl.includes('/api/auth')) {
    next();
    return;
  }
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified.user;
    req.body.userId = verified?.user?._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send('Invalid Token');
  }
};
