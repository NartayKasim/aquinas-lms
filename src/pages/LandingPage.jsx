import React from 'react';
import LandingHeader from '../components/landing/LandingHeader';
import LandingBody from '../components/landing/LandingBody';
import LandingFooter from '../components/landing/LandingFooter';
import requireAuth from '../auth/requireAuth';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <LandingHeader />
            <LandingBody />
            <LandingFooter />
        </div>
    )
}

export default requireAuth(LandingPage);
