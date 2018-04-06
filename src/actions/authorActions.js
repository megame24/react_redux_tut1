import AuthorApi from '../api/mockAuthorApi';
import { LOAD_AUTHOR_SUCCESS } from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorSucess(authors) {
    return {
        type: LOAD_AUTHOR_SUCCESS,
        payload: authors
    };
}

export function loadAuthors() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorSucess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}