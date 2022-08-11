import { appConstants } from "redux/constants";

const initState = {
  streams: [],
  broadcasters: [],
  myStreams: [],
  loading: false,
  error: null,
  message: ""
}

export default (state = initState, action) => {
  switch(action.type){
    case appConstants.GET_STREAMS_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.GET_STREAMS_SUCCESS:
      state={
        ...state,
        streams: action.payload.data,
        loading: false
      }
      break;

    case appConstants.GET_STREAMS_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.GET_MY_STREAMS_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.GET_MY_STREAMS_SUCCESS:
      state={
        ...state,
        myStreams: action.payload.data,
        loading: false
      }
      break;

    case appConstants.GET_MY_STREAMS_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;
  }
  return state;
}