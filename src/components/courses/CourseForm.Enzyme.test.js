import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving) {
    const props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    return shallow(<CourseForm {...props} />);
}

describe('CourseForm via enzyme test', () => {
    it('renders form', () => {
        const wrapper = setup(false);
        expect(wrapper.find('form').length).toBe(1);
    });

    it('save button is labeled "save" when not saving', () => {
        const wrapper = setup(false);
        expect(wrapper.find('input').props().value).toBe('save');
    });

    it('save button is labeled "saving..." when saving', () => {
        const wrapper = setup(true);
        expect(wrapper.find('input').props().value).toBe('saving...');
    });
});