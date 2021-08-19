import React from 'react'
import requireAuth from '../auth/requireAuth';
import ViewCourse from '../components/course/view/ViewCourse';
import ShowCourse from '../components/course/view/ShowCourse';
import { useSelector } from 'react-redux';

const CoursePage = () => {
    const isInstructor = useSelector(state => state.user.isInstructor)


    return (
        <div className="course-page">
            {isInstructor ? <ViewCourse /> : <ShowCourse />}
        </div>
    )
}

export default requireAuth(CoursePage);
