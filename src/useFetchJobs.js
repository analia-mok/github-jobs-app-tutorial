import {useReducer, useEffect} from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error'
};

function reducer(state, action) {
  switch(action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        isLoading: true,
        jobs: [],
      };
    case ACTIONS.GET_DATA:
      return { ...state, isLoading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, isLoading: false, error: action.payload.error, jobs: []}
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {jobs: [], isLoading: true});

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    dispatch({type:ACTIONS.MAKE_REQUEST});

    axios.get('/.netlify/functions/node-fetch', {
      cancelToken: cancelToken.token,
      params: {
        markdown: false,
        page: page,
        ...params
      }
    })
    .then(res => {
      dispatch({ type: ACTIONS.GET_DATA, payload: {jobs: res.data.jobs}})
    })
    .catch(e => {
      if(axios.isCancel(e)) return;

      dispatch({type: ACTIONS.ERROR, payload: {error: e}})
    });

    return () => {
      cancelToken.cancel()
    };
  }, [params, page]);

  return state;
}