import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createCourse, loadCourses } from '../../actions/courseAction';
import CourseList from './CourseList';

class CoursesPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadCourses();
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        const {courses} = this.props;
        return (
            <div>
                <h1>courses</h1>
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired,
    loadCourses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    //ownProps will be mainly usefull when working with router injected props
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps, { createCourse, loadCourses })(CoursesPage);