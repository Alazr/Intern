import config from './config.json'
import http from './httpServices'

const baseUrl = `${config.apiEndpoint}/users`

export const registerUser = (user)=>{
    delete user.confirm
    return http.post(baseUrl,user)
}


