function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function removeToken() {
    localStorage.removeItem('token');
}

function getUserFromToken() {
    // is the token expired?
    const token = getToken();
    // we're getting token from localStorage w/ user
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

function setToken(token) {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}
export default {
    setToken,
    getUserFromToken,
    removeToken
}