import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLink = props => {
    const { path, displayString } = props;

    const pathDisplayFormatter = displayString => {
        const formattedDisplayString = displayString.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return formattedDisplayString
    }

    return (
        <Link to={{ pathname: `${path}` }}>
            <div className="navigation-link">
                <span>{pathDisplayFormatter(displayString)}</span>
                <div className="navigation-link__accent"></div>
            </div>
        </Link>

    )
}

export default NavigationLink;

export const DASHBOARD = '/dashboard';
export const SETTINGS = '/dashboard/settings';
export const LOGIN = '/login';