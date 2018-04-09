import expect from 'expect';
import * as actions from '../actions/courseAction';
import courseReducer from './courseReducer';

describe('Course Reducer', () => {
    it('Should add course when passed CREATE_COURSE_SUCCESS', () => {
        //arrange
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};

        const action = actions.createCourseSuccess(newCourse);

        //act
        const newState = courseReducer(initialState, action);

        //assert
        expect(newState.length).toBe(3);
        expect(newState[0].title).toBe('A');
        expect(newState[1].title).toBe('B');
        expect(newState[2].title).toBe('C');
    });

    it('Should update course when passed UPDATE_COURSE_SUCCESS', () => {
        //arrange
        const initialState = [
            {id: 'a', title: 'a'},
            {id: 'b', title: 'b'},
            {id: 'c', title: 'c'}
        ];

        const course = {id: 'b', title: 'New Title'};
        const action = actions.updateCourseSuccess(course);

        //act
        const newState = courseReducer(initialState, action);
        const updatedCourse = newState.find(element => element.id == course.id);
        const untouchedCourse = newState.find(element => element.id == 'a');

        //assert
        expect(updatedCourse.title).toBe('New Title');
        expect(untouchedCourse.title).toBe('a');
        expect(newState.length).toBe(3);
    });
});