import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

export function getDrives() {
    return axios.get('/drives').then(res => res.data)
}

export function getFilseFromFolder(path) {
    return axios.post('/open-folder', { path }).then(res => res.data)
}