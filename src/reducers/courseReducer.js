import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch(action.type) {
        case CREATE_COURSE_SUCCESS:
            return [
                ...state, Object.assign({}, action.payload)
            ];
        
        case UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.payload.id), Object.assign({}, action.payload)
            ];
        
        case LOAD_COURSES_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}