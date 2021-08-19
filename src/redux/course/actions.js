import types from "./types";
import axios from 'axios';
import formatCourses from './formatCourses';

export const getCourses = () => async dispatch => {
    const response = await axios.get('/api/getcourses/');
    const formattedCourses = formatCourses(response.data);
    if (formattedCourses !== null) {
        dispatch({
            type: types.GET_COURSES,
            payload: formattedCourses
        })
    }
}

export const renameCourseTitle = userObj => async dispatch => {
    const response = await axios.put('/api/renamecourse/', userObj);
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.RENAME_COURSE_TITLE,
            payload: formattedCourses
        })
    }
}

export const renameCourseDescription = userObj => async dispatch => {
    const response = await axios.put('/api/renamecoursedescription/', userObj);
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.RENAME_COURSE_DESCRIPTION,
            payload: formattedCourses
        })
    }
}

export const renameUnitTitle = userObj => async dispatch => {
    const response = await axios.put('/api/renameunit/', userObj);
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.RENAME_UNIT_TITLE,
            payload: formattedCourses
        })
    }
}

export const renameUnitDescription = userObj => async dispatch => {
    const response = await axios.put('/api/renameunitdescription/', userObj);
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.RENAME_UNIT_TITLE,
            payload: formattedCourses
        })
    }
}

export const deleteUnit = userObj => async dispatch => {
    const response = await axios.delete('/api/deleteunit/', { data: userObj });
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.DELETE_UNIT,
            payload: formattedCourses
        })
    }
}

export const createUnit = userObj => async dispatch => {
    const response = await axios.post('/api/createunit', userObj);
    const formattedCourses = formatCourses([response.data.value]);
    if (formattedCourses !== null) {
        dispatch({
            type: types.CREATE_NEW_UNIT,
            payload: formattedCourses
        })
    }
}

export const moveModuleUp = userObj => async dispatch => {
    const response = await axios.put('/api/movemoduleup', userObj)
    const formattedCourses = formatCourses([response.data.value])
    if (formattedCourses !== null) {
        dispatch({
            type: types.MOVE_MODULE_UP,
            payload: formattedCourses
        })
    }
}

export const moveModuleDown = userObj => async dispatch => {
    const response = await axios.put('/api/movemoduledown', userObj)
    const formattedCourses = formatCourses([response.data.value])
    if (formattedCourses !== null) {
        dispatch({
            type: types.MOVE_MODULE_DOWN,
            payload: formattedCourses
        })
    }
}

export const createNewModule = userObj => async dispatch => {
    const response = await axios.post('/api/createnewmodule', userObj)
    const formattedCourses = formatCourses([response.data.value])
    if (formattedCourses !== null) {
        dispatch({
            type: types.MOVE_MODULE_DOWN,
            payload: formattedCourses
        })
    }
}

export const deleteModule = userObj => async dispatch => {
    console.log(userObj)
    const response = await axios.delete('/api/deletemodule', { data: userObj })
    const formattedCourses = formatCourses([response.data.value])
    if (formattedCourses !== null) {
        dispatch({
            type: types.DELETE_MODULE,
            payload: formattedCourses
        })
    }

}