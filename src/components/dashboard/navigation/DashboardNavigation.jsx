import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/user/actions';
import { ReactComponent as Logo } from '../../../assets/logo.svg'

const DashboardNavigation = props => {
    const location = props.location.pathname;
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
        props.history.push('/login')
    }

    return (
        <div className="dashboard-navigation">
            <div className="dashboard-navigation--outer">
                <div className="dashboard-navigation--inner">
                    <Logo className="dashboard-navigation--inner__nav-logo" />
                    <div className="dashboard-navigation--inner__nav">
                        <Link to="/dashboard">
                            <div className="nav-button">Home</div>
                        </Link>
                        <Link to="/dashboard">
                            <div className="nav-button">Messages</div>
                        </Link>
                        <Link to="/dashboard/settings">
                            <div className="nav-button">Settings</div>
                        </Link>
                        <div className="nav-button" onClick={() => logout()}>Log Out</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default withRouter(DashboardNavigation);
