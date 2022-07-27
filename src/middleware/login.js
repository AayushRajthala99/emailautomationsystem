function checkSignIn(req, res, next) {
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();
    } else {
        const loginErr = new Error("Un-Authenticated Request");
        // storing in session because res.locals only lasts for a single request response cycle
        // redirect starts a new cycle
        // using redirect in error handling middleware
        req.session.loginErr = "Un-Authenticated Request";
        next(loginErr);
    }
}

function checkSignedOut(req, res, next) {
    res.set('Cache-control', 'no-store'); // so that going back doesnt load from cache
    if (!req.session.user) {
        res.locals.signedOut = true;
        next();
    } else {
        res.locals.signedOut = false;
        next();
    }
}

module.exports = {
    checkSignIn,
    checkSignedOut,
}