module.exports = {
    authenticate
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
