import types from './types';

const initialState = {
    courses: {}
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        default:
            return state
        case types.GET_COURSES:
            return { ...payload }
        case types.RENAME_COURSE_TITLE:
            const courseID = Object.keys(payload)[0];
            state[courseID] = Object.values(payload)[0];
            return { ...state }
        case types.RENAME_COURSE_DESCRIPTION:
            const descriptionCourseID = Object.keys(payload)[0];
            state[descriptionCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.RENAME_UNIT_TITLE:
            const unitTitleCourseID = Object.keys(payload)[0];
            state[unitTitleCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.RENAME_UNIT_DESCRIPTION:
            const unitDescriptionCourseID = Object.keys(payload)[0];
            state[unitDescriptionCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.DELETE_UNIT:
            const unitDeletionCourseID = Object.keys(payload)[0];
            state[unitDeletionCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.CREATE_NEW_UNIT:
            const unitCreationCourseID = Object.keys(payload)[0];
            state[unitCreationCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.MOVE_MODULE_UP:
            const moduleChangeUpCourseID = Object.keys(payload)[0];
            state[moduleChangeUpCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.MOVE_MODULE_DOWN:
            const moduleChangeDownCourseID = Object.keys(payload)[0];
            state[moduleChangeDownCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.CREATE_NEW_MODULE:
            const createNewModuleCourseID = Object.keys(payload)[0];
            state[createNewModuleCourseID] = Object.values(payload)[0];
            return { ...state }
        case types.DELETE_MODULE:
            const deleteModuleCourseID = Object.keys(payload)[0];
            state[deleteModuleCourseID] = Object.values(payload)[0];
            return { ...state }
    }
}