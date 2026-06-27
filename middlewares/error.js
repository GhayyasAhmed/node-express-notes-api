function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function globalErrorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";

  if (req.accepts("html") && !req.originalUrl.startsWith("/api/")) {
    return res.status(statusCode).send(`<h1>Error ${statusCode}</h1><p>${message}</p>`);
  }

  return res.status(statusCode).json({ error: message });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler,
};
