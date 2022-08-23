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

export const createStream = (data) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.CREATE_STREAM_REQUEST });
      const response = await axios.post("/streams/", data);
      if(response.status === 201){                
        dispatch(getMyStreams());
        dispatch({type: appConstants.CREATE_STREAM_SUCCESS});      
      }else{
        dispatch({type: appConstants.CREATE_STREAM_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.CREATE_STREAM_FAILURE});
    }
  }
}

export const editStream = (data, id) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.EDIT_STREAM_REQUEST });
      const response = await axios.put(`/streams/${id}`, data);
      if(response.status === 200){        
        dispatch(getMyStreams());
        dispatch({type: appConstants.EDIT_STREAM_SUCCESS});
      }else{
        dispatch({type: appConstants.EDIT_STREAM_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.EDIT_STREAM_FAILURE});
    }
  }
}

export const deleteStream = (id) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.DELETE_STREAM_REQUEST });
      const response = await axios.delete(`/streams/${id}`);
      if(response.status === 200){        
        dispatch(getMyStreams());
        dispatch({ type: appConstants.DELETE_STREAM_SUCCESS });        
      }else{
        dispatch({type: appConstants.DELETE_STREAM_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.DELETE_STREAM_FAILURE});
    }
  }
}

export const createStreamToken = (id, key) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.CREATE_STREAM_TOKEN_REQUEST });
      const response = await axios.get(`/streams/create-token/${id}`);      
      if(response.status === 200){        
        const data = {
          token: response.data?.token,
          key: key
        }
        dispatch({
          type: appConstants.CREATE_STREAM_TOKEN_SUCCESS,
          payload: { data }
        });
      }else{
        dispatch({type: appConstants.CREATE_STREAM_TOKEN_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.CREATE_STREAM_TOKEN_FAILURE});
    }
  }
}

export const resetStreamTokenData = () => {
  return async dispatch => {
    dispatch({ type: appConstants.RESET_STREAM_TOKEN });
  }
}

export const getBroadcasters = () => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.GET_BROADCASTERS_REQUEST });
      const response = await axios.get("/streams/broadcaster");
      if(response.status === 200){        
        dispatch({
          type: appConstants.GET_BROADCASTERS_SUCCESS,
          payload: { data: response.data }
        });
      }else{
        dispatch({type: appConstants.GET_BROADCASTERS_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.GET_BROADCASTERS_FAILURE});
    }
  }
}

export const updateBroadcaster = (id) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.UPDATE_BROADCASTERS_REQUEST });
      const response = await axios.put(`/auth/user-status-update/${id}`);
      if(response.status === 200){        
        dispatch(getBroadcasters());
        dispatch({type: appConstants.UPDATE_BROADCASTERS_SUCCESS});
      }else{
        dispatch({type: appConstants.UPDATE_BROADCASTERS_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.UPDATE_BROADCASTERS_FAILURE});
    }
  }
}

export const getStreamInfo = (key) => {
  return async dispatch => {
    try{
      dispatch({ type: appConstants.GET_STREAM_INFO_REQUEST });
      const response = await axios.get(`/streams/stream/${key}`);
      if(response.status === 200){           
        dispatch({
          type: appConstants.GET_STREAM_INFO_SUCCESS,
          payload: { data: response.data[0] }
        });
      }else{
        dispatch({type: appConstants.GET_STREAM_INFO_FAILURE});
      }
    }catch(error){
      dispatch({type: appConstants.GET_STREAM_INFO_FAILURE});
    }
  }
}