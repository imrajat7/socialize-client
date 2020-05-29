import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types';
import Axios from 'axios';


//Get all screams
export const getScreams = ()=>dispatch=>{
  dispatch({type: LOADING_DATA});
  Axios.get('/screams')
    .then(res=>{
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch(err=>{
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

//Like a scream

export const likeScream = (screamId)=>dispatch=>{
  Axios.get(`/scream/${screamId}/like`)
    .then(res=>{
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
}

//Unlike a scream
export const unlikeScream = (screamId)=>dispatch=>{
  Axios.get(`/scream/${screamId}/unlike`)
    .then(res=>{
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
}

export const deleteScream = (screamId) =>(dispatch)=>{ 
  Axios.delete(`/scream/${screamId}`)
  .then(()=>{
    dispatch({type: DELETE_SCREAM, payload: screamId})
  })
  .catch(err=>{
    console.log(err);
  })
}