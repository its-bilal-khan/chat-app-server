export const bootstrap = () => {
  const CustomError = {
    throw(name) {
      this.name = name;
      throw this;
    },
  };
  Error.throw = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
  };
  Error.NotFound = message => {
    const error = new Error(message);
    error.status = 404;
    return error;
  };
  Error.BadRequest = message => {
    const error = new Error(message);
    error.status = 400;
    return error;
  };
};
