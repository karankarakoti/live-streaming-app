import { appConstants } from "redux/constants";

const initState = {
  streams: [],
  stream: {},
  broadcasters: [],
  myStreams: [],
  loading: false,
  error: null,
  message: "",
  streamToken: "",
  streamKey: ""
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

    case appConstants.CREATE_STREAM_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.CREATE_STREAM_SUCCESS:
      state={
        ...state,
        message: "Stream Created Successfully!",
        loading: false
      }
      break;

    case appConstants.CREATE_STREAM_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.EDIT_STREAM_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.EDIT_STREAM_SUCCESS:
      state={
        ...state,
        message: "Updated Successfully!",
        loading: false
      }
      break;

    case appConstants.EDIT_STREAM_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.DELETE_STREAM_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.DELETE_STREAM_SUCCESS:
      state={
        ...state,
        message: "Deleted Successfully!",
        loading: false
      }
      break;

    case appConstants.DELETE_STREAM_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.CREATE_STREAM_TOKEN_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.CREATE_STREAM_TOKEN_SUCCESS:
      state={
        ...state,
        streamToken: action.payload.data.token,
        streamKey: action.payload.data.key,
        loading: false
      }
      break;

    case appConstants.CREATE_STREAM_TOKEN_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.RESET_STREAM_TOKEN:
      state={
        ...state,
        streamKey: "",
        streamToken: ""
      }
      break;

    case appConstants.GET_BROADCASTERS_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.GET_BROADCASTERS_SUCCESS:
      state={
        ...state,
        broadcasters: action.payload.data,
        loading: false
      }
      break;

    case appConstants.GET_BROADCASTERS_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.CREATE_BROADCASTERS_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.CREATE_BROADCASTERS_SUCCESS:
      state={
        ...state,
        message: "Broadcaster Created Successfully!",
        loading: false
      }
      break;

    case appConstants.CREATE_BROADCASTERS_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.UPDATE_BROADCASTERS_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.UPDATE_BROADCASTERS_SUCCESS:
      state={
        ...state,
        message: "Broadcaster Updated Successfully!",
        loading: false
      }
      break;

    case appConstants.UPDATE_BROADCASTERS_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;

    case appConstants.RESET_DATA:
      state={
        broadcasters: [],
        myStreams: [],
        streamToken: "",
        streamKey: ""
      }
      break;

    case appConstants.GET_STREAM_INFO_REQUEST:
      state={
        ...state,
        loading: true
      }
      break;

    case appConstants.GET_STREAM_INFO_SUCCESS:
      state={
        ...state,
        stream: action.payload.data,
        loading: false
      }
      break;

    case appConstants.GET_STREAM_INFO_FAILURE:
      state={
        ...state,
        error: "Something Went Wrong",
        loading: false
      }
      break;    

  }
  return state;
}