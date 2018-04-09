import React from 'react';
import expect from 'expect';
import { authorsFormattedForDropDown } from './selectors';

describe('Author Selectors', () => {
    describe('authorsFormattedForDropDown', () => {
        it('Should return author data formatted for use in a dropdown', () => {
            const authors = [
                {id: 'Innocent-Ngene', firstName: 'Innocent', lastName: 'Ngene'},
                {id: 'Anthony-Ngene', firstName: 'Anthony', lastName: 'Ngene'}
            ];

            const expected = [
                {value: 'Innocent-Ngene', text: 'Innocent Ngene'},
                {value: 'Anthony-Ngene', text: 'Anthony Ngene'}
            ];

            expect(authorsFormattedForDropDown(authors)).toEqual(expected);
        });
    });
});