import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    switch(action.type) {
        case CREATE_COURSE:
            return [...state,
                Object.assign({}, action.payload)];
        
        case LOAD_COURSES_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}