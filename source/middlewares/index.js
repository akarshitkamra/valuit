var middlewareObj = {};

middlewareObj.isAdminLoggedIn = (req, res, next) => {
    if(req.user && req.user.type === 'admin') {
        return next()
    }
    req.flash('error', 'Please authenticate yourself first!')
    return res.redirect('/userlistpanel/login')
}

middlewareObj.checkNotAuthenticated=(req, res, next)=> {
    if (req.user) {
      return res.redirect('/userlistpanel')
    }
    next()
  }

module.exports = middlewareObj