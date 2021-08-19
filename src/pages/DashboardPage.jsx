import React from 'react';
import requireAuth from '../auth/requireAuth';
import DashboardNavigation from '../components/dashboard/navigation/DashboardNavigation';
import CourseCardsDisplay from '../components/dashboard/course-cards/CourseCardsDisplay';
import { withRouter } from 'react-router';

const DashboardPage = props => {

    return (
        <div className="dashboard-page">
            <DashboardNavigation />
            {props.location.pathname === '/dashboard' ? <CourseCardsDisplay /> : null}
        </div >
    )
}

export default requireAuth(withRouter(DashboardPage));