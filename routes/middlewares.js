
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

const TL = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}

module.exports = {
    requireAuth,
    TL
}
