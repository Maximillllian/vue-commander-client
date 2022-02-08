import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

export function getDrives() {
    return axios.get('/drives').then(res => res.data)
}

export function getFilesFromFolder(path) {
    return axios.post('/open-folder', { path }).then(res => res.data)
}

export function openFileNative(path) {
    return axios.post('/open-file-native', { path }).then(res => res.data)
}

export function getParentFolderPath(path) {
    return axios.post('/back', { path }).then(res => res.data)
}

export function deleteFiles(paths) {
    return axios.post('/delete', { paths }).then(res => res.data)
}