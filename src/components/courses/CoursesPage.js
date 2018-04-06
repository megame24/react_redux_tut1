import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursesPage extends Component {

    constructor(props, context) {
        super(props, context);
    }

    /*by moving this to the index.js, we disable it from loading every time this component re-renders*/
    // componentWillMount() {
    //     this.props.loadCourses();
    // }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        const {courses} = this.props;
        return (
            <div>
                <h1>courses</h1>
                <input 
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    //ownProps will be mainly usefull when working with router injected props
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps)(CoursesPage);