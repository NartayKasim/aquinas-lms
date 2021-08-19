import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/user/actions';
import { getCourses } from '../redux/course/actions';
import { withRouter } from 'react-router';


// USER-INITIATED ON-PAGE-REFRESH LOGIC
// STATE HYDRATION
// ROUTE PROTECTION
export default ChildComponent => {
    class ComposedComponent extends Component {
        // init state to halt ChildComponent from rendering before the redux state is fully up-to-date:
        state = { loaded: false };

        componentDidMount() {
            // if redux doesn't have a user.userID, then user is either not logged in or has clicked reload:
            if (!this.props.user.userID) {
                // to check to see if user clicked the reload button,
                // run check to see if express has a session and update state with response:
                this.props.updateUser()
                    // behave this way if there was a found express session:
                    .then(
                        // retrieve user's courses from Mongo:
                        () => this.props.getCourses()
                            .then(
                                () => {
                                    // logged in users don't need access to the landing or login page
                                    // since this user is logged in, they need to be redirected to dashboard:
                                    this.setState({ loaded: true })
                                    if (this.props.history.location.pathname === '/' || this.props.history.location.pathname === '/login') {
                                        this.props.history.push('/dashboard');
                                    }
                                }
                            )
                    )
                    // behave this way if there was no express session found:
                    .catch(
                        // if user.userID remains as null, then user isn't logged in:
                        () => {
                            // set loaded to true, because there's no loading to do:
                            this.setState({ loaded: true })

                            // since the user isn't logged in, block all protected content by redirecting to login:
                            if (this.props.history.location.pathname !== '/') {
                                this.props.history.push('/login');
                            }
                        }
                    )
            }
            // if there's a userID, then everything is fine and the ChildComponent needs to be allowed to load:
            else {
                this.setState({ loaded: true })
            }
        }
        render() {
            // halt ChildComponent rendering before the async functions above are complete:
            if (this.state.loaded) {
                return <ChildComponent {...this.props} />

            }
            return null
        }
    }

    function mapStateToProps(state) {
        return state
    }

    return connect(mapStateToProps, { updateUser, getCourses })(withRouter(ComposedComponent));
}