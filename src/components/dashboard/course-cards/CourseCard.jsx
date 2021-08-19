import React from 'react';
import { withRouter } from 'react-router-dom';
import renderHTML from 'react-render-html';


const CourseCard = props => {
    const { course, isInstructor } = props;

    const instructorView =
        <div className="course-card">
            <div className="course-card--left">
                <div className="course-card--left__course-title resolve-nm-wrapper">
                    <span>
                        {course.title}
                    </span>
                </div>
            </div>
            <div className="course-card--right">
                <div className="course-card--right__course-description">
                    <span>
                        {course.description ? renderHTML(course.description) : null}
                    </span>
                </div>
                <div className="course-card--right__course-menu">
                    <span className="course-menu" onClick={() => props.history.push(`/dashboard/courses/${course._id}`)}>Edit Course Content</span>
                    <span className="course-menu">Course Stats</span>
                    <span className="course-menu">Publish Course</span>
                </div>
            </div>
        </div>

    const studentView =
        <div className="course-card">
            <div className="course-card--left">
                <div className="course-card--left__course-title resolve-nm-wrapper">
                    <span>
                        {course.title}
                    </span>
                </div>
            </div>
            <div className="course-card--right">
                <div className="course-card--right__course-description">
                    <span>
                        {course.description ? renderHTML(course.description) : null}
                    </span>
                </div>
                <div className="course-card--right__course-menu">
                    <span className="course-menu" onClick={() => props.history.push(`/dashboard/courses/${course._id}`)}>View Course Content</span>
                </div>
            </div>
        </div>

    return (
        <>
            {isInstructor ? instructorView : studentView}
        </>
    )
}

export default withRouter(CourseCard);
