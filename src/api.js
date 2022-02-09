import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

function addFileNameToFolderPath(filePath, folderPath) {
    const splitedFilePath = filePath.split(/[\\, \\\\, /]/)
    const name = splitedFilePath[splitedFilePath.length - 1]
    const destinationPath = folderPath + '\\' + name
    return destinationPath
}

function createFilesListWithSourceAndDestinationPaths(sourcePaths, pathToCopy) {
    const files = []
    sourcePaths.forEach(path => {
        const destinationPath = addFileNameToFolderPath(path, pathToCopy)
        const fileData = {sourcePath: path, destinationPath }
        files.push(fileData) 
    })
    return files
}

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

export function copyFiles(sourcePaths, pathToCopy) {
    const files = createFilesListWithSourceAndDestinationPaths(sourcePaths, pathToCopy)
    return axios.post('/copy', { files }).then(res => res.data)
}

export function moveFiles(sourcePaths, pathToCopy) {
    const files = createFilesListWithSourceAndDestinationPaths(sourcePaths, pathToCopy)
    return axios.post('/move', { files }).then(res => res.data)
}