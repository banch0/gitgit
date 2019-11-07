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
    create: (categories) => {
        requests.post(`/categories`, categories)
    },
    get: () => requests.get(`/category`),
    getById: () => requests.get(`/categories/${id}`),
    delete: (id) =>
        requests.del(`/categories/${id}`),
    update: (id, categories) =>
        requests.put(`/categories/${id}`, { categories })
}

const Authors = {
    create: (authors) => {
        requests.post(`/authors/`, authors)
    },
    get: () => requests.get(`/authors`),
    getById: (id) => requests.get(`/autthors/${id}`),
    delete: (id) =>
        requests.del(`/authors/${id}`),
    update: (id, categories) =>
        requests.put(`/authors/${id}`, { authors })
}

const Quotes = {
    create: (quotes) => {
        requests.post(`/quotes`, quotes)
    },
    get: () => requests.get(`/quote/abc`),
    getById: (id) => requests.get(`/quotes/${id}`),
    delete: (id) =>
        requests.del(`/quotes/${id}`),
    update: (id, categories) =>
        requests.put(`/quotes/${id}`, { quotes })
}

export default {
    Quotes,
    Authors,
    Categories
}