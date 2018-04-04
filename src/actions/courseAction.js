import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function createCourse(course) {
    return {
        type: CREATE_COURSE,
        payload: course
    };
}

export function loadCoursesSuccess(courses) {
    return {
        type: LOAD_COURSES_SUCCESS,
        payload: courses
    };
}

export function loadCourses() {
    return function(dispatch) {
        return courseApi.getAllCourses().then(course => {
            dispatch(loadCoursesSuccess(course));
        }).catch(error => {
              throw(error);
        });
    };
}