
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

const TL = (_req, _res, next) => {
  console.log('Time: ', Date.now())
  next()
}

export {
    requireAuth,
    TL,
}
