const userService = require('../services/user');

module.exports = (app) => {
    app.get('/users', (req, res, next) => {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    });

    app.post('/users/authenticate', (req, res, next) => {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
            .catch(err => next(err));
    });

    app.post('/users', (req, res, next) => {
        userService.create(req.body)
            .then(user => {
                res.json({message: 'User was successfuly created!'});
            })
            .catch(err =>  res.status(403).json({message: 'Coundn\'t create user!'}));
    });
}