import { authConstants } from "redux/constants";
import axios from "utils/axios";

export const login = (user) => {
  return async dispatch => {
    try{
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const response = await axios.post("/auth/login", user);      
      if(response.status === 200){
        const { token, user } = await response?.data?.data;        
        localStorage.setItem('token', token);               
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { token, user }
        });
      }else{        
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: response.message}
        });
      }
    }catch(error){      
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: error.response?.data?.message}
      });      
    }
  }
}

export const logout = () => {
  return async dispatch => {
    try{
      dispatch({ type: authConstants.LOGOUT_REQUEST })
      const response = await axios.get("/auth/logout");
      console.log(response)
      if(response.status === 200){
        localStorage.clear()
        dispatch({ type: authConstants.LOGOUT_SUCCESS })
      }else{
        dispatch({ type: authConstants.LOGOUT_FAILURE })
      }
    }catch(error){      
      dispatch({ type: authConstants.LOGOUT_FAILURE })
    }
  }
}

export const isUserLoggedIn = () => {
  return async dispatch => {
    try{
      const token = localStorage.getItem('token')
      if(token){
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload:{
            token,
            user              
          }
        })
      }else{
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: 'Failed to login'}
        })
      }
    }catch(error){
      console.log(error)
    }
  }
}