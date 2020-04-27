module.exports = (res, req, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: `Not logged in.` });
  }
};
