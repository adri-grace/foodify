import tokenService from './tokenService';
const BASE_URL = 'api/restaurants/';

function create(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: new Headers({ 
            'Content-type' : 'application/json',
            'Authorization' : 'Bearer ' + tokenService.getToken()
        }),
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.ok) return res.json();
        throw new Error('Are you logged in?');
    })
}

function index() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + tokenService.getToken()}
    }).then(res => res.json());
}

function getFeatured() {
    return fetch(BASE_URL + 'featured').then(res => res.json());
}

export default {
    create, 
    index,
    getFeatured
}