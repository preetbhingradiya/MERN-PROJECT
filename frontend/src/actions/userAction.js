import {
  CLEAR_ERRORS,
  //login user
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  //register user
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  //load user
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  //logout user
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  //profile user
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstans";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-type": "multipart/from-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//Logout user
export const LogoutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-type": "multipart/from-data" } };

    const { data } = await axios.patch(`/api/v1/me/profile`, userData, config);

    dispatch({ type:UPDATE_PROFILE_SUCCESS, payload: data.updatProfile });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
