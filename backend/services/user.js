const mongoose = require('mongoose');
const User = mongoose.model('users'); //I'm not requiring model file, instead I'm connecting to it through mongoose API

module.exports = {
    getAll,
    create
}

/**
 * This method returns array of all authenticated users
 * @returns {Promise<{firstName: string, lastName: string, id: number, username: string}[]>}
 */
async function getAll() {
    const users = await User.find();
    return users.map(u => {
        const { firstName, lastName, username, ...rest } = u;
        return {firstName, lastName, username};
    })
}

/**
 * This method creates new instance of user.
 * @param username
 * @param password
 * @param firstName
 * @param lastName
 * @returns {Promise<Promise|Promise<Promise<never>|*>>}
 */
async function create({username, password, firstName, lastName}) {
    const user = await User.findOne({username, password})

    if(user) {
        return Promise.reject('user exists');
    }

    const newUser = new User({ username, password, firstName, lastName });
    return newUser.save();
}