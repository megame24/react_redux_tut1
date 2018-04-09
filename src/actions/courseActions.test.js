import expect from 'expect';
import * as courseActions from './courseAction';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock'; //for mocking http calls
import configureMockStore from 'redux-mock-store';

//Test a sync action
describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        it('should create a CREATE_COURSE_SUCCESS action', () => {
            //arrange
            const course = {id: 'clean-code', tilte: 'clean code'};
            const expectedAction = {
                type: types.CREATE_COURSE_SUCCESS,
                payload: course
            };

            //act
            const action = courseActions.createCourseSuccess(course);

            //assert
            expect(action).toEqual(expectedAction); //use toEqual for objects that referrences different resources in memory instead of toBe
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    //essential to call cleanAll after each call of our test(nock)
    afterEach(() => {
        nock.cleanAll();
    });

    //note that we pass a callback function called 'done' to Mocha.
    //Call this function when async work is complete
    it('Should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
        //Here's an example call to nock. for mocking real API calls
        //nock('http://example.com/')
        //  .get('/courses')
        //  .reply(200, { body: { courses: [{id: 1, firstName: 'Innocent', lastName: 'Ngene'}] }});

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'clean code'}]}}
        ];

        const store = mockStore({courses: []}, expectedActions);
        store.dispatch(courseActions.loadCourses()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
            done();
        });
    });
});