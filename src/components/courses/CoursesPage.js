import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/courseAction';

class CoursesPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            title: ''
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        this.setState({title: event.target.value});
    }

    onClickSave() {
        this.props.createCourse(this.state);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add course</h2>
                <input
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.title} />
                <input
                    type="submit"
                    value="save"
                    onClick={this.onClickSave} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    //ownProps will be mainly usefull when working with router injected props
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps, { createCourse })(CoursesPage);