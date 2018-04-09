import expect from 'expect';
import { createStore } from 'redux';
import * as courseActions from '../actions/courseAction';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';

describe('Store test', () => {
    it('Should create a new course when createCourse action creator is called', () => {
        // arrange
        const store = createStore(rootReducer, initialState);
        const course = {
            title: 'clean code'
        };

        // act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        // assert
        const actual = store.getState().courses[0];
        const expected = {
            title: 'clean code'
        };
        expect(actual).toEqual(expected);
    });
});