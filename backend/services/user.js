const mongoose = require('mongoose');
const User = mongoose.model('users'); //I'm not requiring model file, instead I'm connecting to it through mongoose API

module.exports = {
    authenticate,
    getAll,
    create
}

/**
 * This method authenticate user.
 * @param username
 * @param password
 * @returns {Promise<Pick<{firstName: string, lastName: string, password: string, id: number, username: string} | undefined, Exclude<keyof {firstName: string, lastName: string, password: string, id: number, username: string} | undefined, "password">>>}
 */
async function authenticate({username, password}) {
    const user = await User.findOne({username, password});

    if(user) {
        const { firstName, lastName, username, ...rest } = user;
        return {firstName, lastName, username};
    }
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