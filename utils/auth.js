const withAuth = (req, res, next) => {
  console.log('**********' + req);
    // If the user isn't logged in, redirect them to the login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
      // res.redirect('/dashboard');
    }
  };
  
  module.exports = withAuth;