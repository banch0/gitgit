import axios from 'axios'
const API = 'http://localhost:8081'

const responseBody = response => response.data;

const requests = {
    del: url => axios.delete(`${API}${url}`).then(responseBody).catch(function (error) {
        console.log(error)
    }),
    get: url => axios.get(`${API}${url}`).then(responseBody).catch(function (error) {
        console.log(error)
    }),
    put: (url, body) => axios.put(`${API}${url}`, body).then(responseBody).catch(function (error) {
        console.log(error)
    }),
    post: (url, body) => axios.post(`${API}${url}`, body).then(responseBody).catch(function (error) {
        console.log(error)
    })
}

const Categories = {
    create: categories => requests.post(`/category/create`, categories ),
    get: () => requests.get(`/category`),
    getById: (id) => requests.get(`/category/${id}`),
    delete: (id) =>
        requests.del(`/category/${id}`),
    update: (id, categories) =>
        requests.put(`/category/${id}`, { categories })
}

const Authors = {
    create: authors => requests.post(`/author/create`, authors ),
    get: () => requests.get(`/authors`),
    getById: (id) => requests.get(`/autthors/${id}`),
    delete: (id) =>
        requests.del(`/authors/${id}`),
    update: (id, authors) =>
        requests.put(`/authors/${id}`, { authors })
}

const Quotes = {
    create: (quotes) => {
        requests.post(`/quote/create`, quotes )
    },
    get: () => requests.get(`/quote/abc`),
    getById: (id) => requests.get(`/quote/${id}`),
    delete: (id) =>
        requests.del(`/quote/${id}`),
    update: (id, quotes ) =>
        requests.put(`/quote/${id}`, { quotes })
}

export default {
    Quotes,
    Authors,
    Categories
}