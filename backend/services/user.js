const users = [{id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'TestLastName'}];

module.exports = {
    authenticate,
    getAll
}

/**
 * This method authenticate user.
 * @param username
 * @param password
 * @returns {Promise<Pick<{firstName: string, lastName: string, password: string, id: number, username: string} | undefined, Exclude<keyof {firstName: string, lastName: string, password: string, id: number, username: string} | undefined, "password">>>}
 */
async function authenticate({username, password}) {
    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

/**
 * This method returns array of all authenticated users
 * @returns {Promise<{firstName: string, lastName: string, id: number, username: string}[]>}
 */
async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    })
}