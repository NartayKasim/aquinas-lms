import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import CoursePage from './pages/CoursePage';
import UnitPage from './pages/UnitPage';
// import SettingsPage from './pages/SettingsPage';
// import CoursePage from './pages/CoursePage';
// import CourseNavigation from './components/course/CourseNavigation';
// import EditCourseDisplay from './components/course/edit/EditCourseDisplay';

export default (
    <>
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard">
                <DashboardPage />
                <Switch>
                    <Route path="/dashboard/courses/:courseID" exact component={CoursePage} />
                    <Route path="/dashboard/courses/:courseID/:idx" exact component={UnitPage} />
                    <Route path="/dashboard/settings" component={SettingsPage} />
                </Switch>
            </Route>
        </Switch>
    </>
)