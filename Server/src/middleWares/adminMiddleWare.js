const isAdmin = (req, res, next) => {
  const isAdmin = req.headers["x-admin"];
  console.log(isAdmin);
  if (isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized as an admin!");
  }
};
module.exports = isAdmin;
