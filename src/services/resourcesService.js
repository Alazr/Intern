import config from './config.json'
import http from './httpServices'
import auth from './authService'

const user = auth.currentUser()


const getFiles = () =>{
    return http.get(`${config.apiEndpoint}/users/${user._id}/resources`)
}

const uploadFile = (file) =>{
    return http.post(`${config.apiEndpoint}/users/${user._id}/resources`,file)
}

const getFile = (fileId) =>{
    return http.get(`${config.apiEndpoint}/users/${user._id}/resources/${fileId}`)
}
const getData = (p) =>{
    return `${config.apiEndpoint}${p}`
}

const deleteFile = async (fileId) =>{
    return await http.delete(`${config.apiEndpoint}/users/${user._id}/resources/${fileId}`)
}


export default {
    getFile,
    getFiles,
    getData,
    deleteFile,
    uploadFile,
}