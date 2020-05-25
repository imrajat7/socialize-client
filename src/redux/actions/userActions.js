import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, } from './../types';
import Axios from 'axios';

export const loginUser = (userData,history)=>(dispatch)=>{
  dispatch({type: LOADING_UI});
  Axios.post("/login", userData)
  .then((res) => {
    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    Axios.defaults.headers.common['Authorization'] = FBIdToken;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS});
    history.push("/");
  })
  .catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err,
    })
  });
}

export const getUserData = ()=>(dispatch)=>{
  Axios.get('/user')
    .then(res=>{
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
}