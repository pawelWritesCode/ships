const userService = require('../services/user');

module.exports = (app) => {
    app.get('/api/users', (req, res, next) => {
        userService.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    });

    app.post('/api/users', (req, res, next) => {
        userService.create(req.body)
            .then(user => {
                const {username, firstName, lastName, ...rest} = user;
                res.json({username, firstName, lastName});
            })
            .catch(err =>  res.status(403).json({message: 'Coundn\'t create user!'}));
    });
}