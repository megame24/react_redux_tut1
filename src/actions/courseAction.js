
// next time use (* as blah blah blah) for these action types
import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';


export function loadCoursesSuccess(courses) {
    return {
        type: LOAD_COURSES_SUCCESS,
        payload: courses
    };
}

export function createCourseSuccess(course) {
    return {
        type: CREATE_COURSE_SUCCESS,
        payload: course
    };
}

export function updateCourseSuccess(course) {
    return {
        type: UPDATE_COURSE_SUCCESS,
        payload: course
    };
}

export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(course => {
            dispatch(loadCoursesSuccess(course));
        }).catch(error => {
              throw(error);
        });
    };
}

export function saveCourse(course) {
    return function(dispatch, getState) {
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}