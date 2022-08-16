import axios from "axios";
import { config } from "./config";
import { authConstants } from "redux/constants";
import store from "redux/store";

const token = window.localStorage.getItem("token")

const axiosInstance = axios.create({
    baseURL: config.API_URL,
    headers:{
        "Authorization": token ? `Bearer ${token}` : ""
    }
})

axiosInstance.interceptors.request.use((req)=>{
    const { auth } = store.getState()
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req
})

axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {        
        const status = error.response ? error.response.status : 500
        const name = error.response ? error.response.data.name : ""
        if(status && status === 500 && name === "UnauthorizedError"){
            localStorage.clear()
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS })
        }
        return Promise.reject(error)
    }
)

export default axiosInstance