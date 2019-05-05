module.exports = (req, re, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
};
