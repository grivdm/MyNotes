import { useContext } from 'react'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import AuthContext from '../context/AuthContext';


let useFetch = () => {

    let config = {}
    let {authToken, setAuthTokens, setUser} = useContext(AuthContext)

    let baseURL = 'http://127.0.0.1:8000'

    let originalRequest = async (url, config)=> {

        console.log('originalRequest ', url, config)
        url = `${baseURL}${url}`
        let response = await fetch(url, config)
        if(response){
            let data = await response.json()
            return {response, data}
        }
        // console.log('REQUESTING:', data)
    }

    let refreshToken = async (authToken) => {
        console.log('refreshToken')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken.refresh})
        })
        let data = await response.json()
        if (data.code !=="token_not_valid"){
        localStorage.setItem('authToken', JSON.stringify(data))
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        }
        return data
    }

    let callFetch = async (url, settings) => {
        
        const user = jwt_decode(authToken?.access)
        const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
        console.log('is expired', isExpired)

        if(isExpired){
            authToken =  await refreshToken(authToken).then(console.log('refreshtoken finish'))
        }

        config = {...settings}
        config['headers'] = {
            Authorization: `Bearer ${authToken?.access}`,
            'Content-Type':'application/json'
        }
        console.log('config:', config)
        console.log('is expired final', isExpired)

        

        let {response, data} = await originalRequest(url, config)
        return {response, data}
    }

    return callFetch
}

export default useFetch;