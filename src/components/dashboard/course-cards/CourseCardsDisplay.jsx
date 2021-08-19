import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from './CourseCard';

export default function CourseCardsDisplay() {

    const courses = useSelector(state => state.courses);
    const isInstructor = useSelector(state => state.user.isInstructor);

    const coursesArray = Object.keys(courses)

    const instructorCoursesMapper = coursesArray.map(course => <CourseCard key={course} isInstructor={isInstructor} course={courses[course]} />)

    const studentCoursesMapper = coursesArray.map(course => <CourseCard key={course} isInstructor={isInstructor} course={courses[course]} />);

    return (
        <div className="course-cards-display">
            {isInstructor ? instructorCoursesMapper : studentCoursesMapper}
        </div>
    )
}
