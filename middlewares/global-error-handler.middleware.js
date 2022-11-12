export const GlobalMiddleware = (error, req, res, next) => {
  console.error(error);
  if (error?.status) {
    return res.status(error?.status).send(error.message);
  }
  res.status(500).send('Internal Server Error');
  next(error);
};
