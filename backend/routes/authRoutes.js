const authService = require('../services/auth');

module.exports = (app) => {
    app.post('/api/authenticate', (req, res, next) => {
        authService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(401).json({message: 'Username or password is incorrect'}))
            .catch(err => next(err));
    });
}