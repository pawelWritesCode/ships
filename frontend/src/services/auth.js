

/**
 * This method gets user object from local storage and return Authorization header.
 * @returns {{Authorization: string}|{}}
 */
export function authHeader() {
    let token = JSON.parse(localStorage.getItem('token'));

    if(token) {
        return { Authorization: `Bearer ${token}` };
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

    return fetch('http://localhost:5000/auth/login', requestOpts)
        .then(handleResponse)
        .then(data => {
            if(data.token) {
                localStorage.setItem('token', JSON.stringify(data.token));
            }

            return data.token;
        })
}

export function register(username, password, retypedPassword) {
    if(password !== retypedPassword) {
        return;
    }

    const requestOpts = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    }

    return fetch('http://localhost:5000/auth/register', requestOpts)
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
    localStorage.removeItem('token');
}

/**
 * This method handle response from /auth/login route
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