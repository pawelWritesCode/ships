

/**
 * This method gets user object from local storage and return Authorization header.
 * @returns {{Authorization: string}|{}}
 */
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if(user && user.authdata) {
        return { Authorization: `Basic ${user.authdata}` };
    }

    return {};
}

/**
 * This method send post request to authenticate user.
 * @param username
 * @param password
 * @returns {Promise<Response | never>}
 */
export function login(username, password) {
    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    };

    return fetch('http://localhost:5000/api/authenticate', requestOpts)
        .then(handleResponse)
        .then(user => {

            //if there is user, login is successful
            if(user) {
                //store user details and basic auth cred. in local storage
                user.authdata = window.btoa(`${username}:${password}`);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
}

export function register(username, password, retypedPassword, firstName, lastName) {
    if(password !== retypedPassword) {
        return;
    }

    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password, firstName, lastName})
    }

    return fetch('http://localhost:5000/api/users', requestOpts)
        .then(resp => {
            if(!resp.ok) {
                const error = (resp && resp.message) || resp.statusText;
                return Promise.reject(error);
            }

            return resp;
        });
}

/**
 * This method removes from local storage user data
 */
export function logout() {
    localStorage.removeItem('user');
}

export function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:5000/users', requestOptions)
        .then(handleResponse);
}

/**
 * This method handle response from /users/authenticate route
 * @param response
 * @returns {*}
 */
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if(!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
}