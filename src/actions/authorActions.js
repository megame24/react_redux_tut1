import AuthorApi from '../api/mockAuthorApi';
import { LOAD_AUTHOR_SUCCESS } from './actionTypes';

export function loadAuthorSucess(authors) {
    return {
        type: LOAD_AUTHOR_SUCCESS,
        payload: authors
    };
}

export function loadAuthors() {
    return dispatch => {
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorSucess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}