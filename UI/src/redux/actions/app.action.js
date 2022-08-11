import { appConstants } from "redux/constants";
import axios from "utils/axios";

export const getStreams = () => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.GET_STREAMS_REQUEST });
      const response = await axios.get("/streams/live");
      if(response.status === 200){        
        dispatch({
          type: appConstants.GET_STREAMS_SUCCESS,
          payload: { data: response.data }
        });
      }else{
        dispatch({type: appConstants.GET_STREAMS_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.GET_STREAMS_FAILURE});
    }
  }
}

export const getMyStreams = () => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.GET_MY_STREAMS_REQUEST });
      const response = await axios.get("/streams/user");
      if(response.status === 200){        
        dispatch({
          type: appConstants.GET_MY_STREAMS_SUCCESS,
          payload: { data: response.data }
        });
      }else{
        dispatch({type: appConstants.GET_MY_STREAMS_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.GET_MY_STREAMS_FAILURE});
    }
  }
}