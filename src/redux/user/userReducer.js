import types from './types';

const initialState = {
    userID: null,
    email: null,
    firstName: null,
    lastName: null,
    error: null
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state
        case types.UPDATE_USER:
            return { ...payload }
        case types.LOGOUT_USER:
            return { ...initialState }
    }
}