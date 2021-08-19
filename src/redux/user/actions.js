import types from "./types";
import axios from "axios";

export const logoutUser = () => async dispatch => {
    await axios.post('/api/auth/logout')
    dispatch
        (
            {
                type: types.LOGOUT_USER
            }
        )
}

export const updateUser = () => async dispatch => {
    const update = await axios.get('/api/auth/me');
    dispatch
        (
            {
                type: types.UPDATE_USER,
                payload: update.data
            }
        )
}