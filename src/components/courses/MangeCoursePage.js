import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CourseForm from './CourseForm';
import { saveCourse } from '../../actions/courseAction';
import toastr from 'toastr';
import { authorsFormattedForDropDown } from '../../selectors/selectors';

export class ManageCoursePage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.courseFormIsValid = this.courseFormIsValid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.course.id != nextProps.course.id) {
            // necessary to populate form when existing course is loaded directly,
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if(this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if(!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        this.props.saveCourse(this.state.course)
        .then(() => this.redirect())
        .catch(error => {
            toastr.error(error);
            this.setState({saving: false});
        })
        ;
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Course saved successfully');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    allAuthors={this.props.authors}
                    errors={this.state.errors} 
                    course={this.state.course}
                    saving={this.state.saving} />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    saveCourse: PropTypes.func.isRequired
};

//pull in the React Router context so router is available on this.context.router.
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if(course.length) return course[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; //from the path '/course/:id'

    //setting the initial state here in the smart component, to pass down to the dumb component... course is not
    //coming from state.
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if(courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    return {
        course: course,
        authors: authorsFormattedForDropDown(state.authors)
    };
}

export default connect(mapStateToProps, { saveCourse })(ManageCoursePage);