const formatCourses = courses => {
    if (courses[0] === null) {
        return null
    }
    else {
        const formattedCourses = {}
        courses.forEach(course => formattedCourses[course._id] = course)
        return formattedCourses
    }
}

export default formatCourses;