import config from './config.json'
import http from './httpServices'
import jwtDecode from 'jwt-decode'

const authBase = `${config.apiEndpoint}/auth`
const tokenKey = "token"

http.setJwt(getJwt())

const login = async user=>{
    const {data} = await http.post(authBase,user)
    localStorage.setItem(tokenKey,data)
} 

const loginWithJwt = (jwt)=>{
    localStorage.setItem(tokenKey,jwt)

}

const currentUser = ()=>{
    const jwt = getJwt()
    const user = jwt ? jwtDecode(jwt) : null
    return user
}

function getJwt(){
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    loginWithJwt,
    currentUser
}