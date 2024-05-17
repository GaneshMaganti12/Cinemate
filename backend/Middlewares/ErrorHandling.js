module.exports = (err, req, res, next) => {
  let status = 500;
  let message = "";

  console.log(err);

  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    status = 404;
  }
  if (err.name === "TokenExpiredError") {
    message = `Json Web Token is expired`;
    status = 400;
  }

  if (err.code == 11000) {
    message = `Duplicate key`;
    status = 200;
  }

  res.status(status).json({
    success: false,
    message: message,
  });
};
