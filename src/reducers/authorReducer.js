import { LOAD_AUTHOR_SUCCESS } from '../actions/actionTypes';
import initalState from './initialState';

export default function authorReducer(state = initalState.authors, action) {
    switch(action.type) {
        case LOAD_AUTHOR_SUCCESS:
            return action.payload;

        default:
            return state;
    }
}