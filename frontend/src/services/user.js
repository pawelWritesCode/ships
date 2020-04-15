import { authHeader } from "./auth";

export function getUser() {
    const bearer = authHeader()

    return fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            ...bearer
        }
    });
}

export function changeUser(user) {
    const bearer = authHeader()

    return fetch('http://localhost:5000/api/user', {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
            ...bearer
        },
        body: JSON.stringify(user)
    })
}