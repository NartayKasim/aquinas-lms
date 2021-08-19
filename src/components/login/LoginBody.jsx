import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function LoginBody(props) {
    const { setEmail, setPassword } = props;
    return (
        <div className="login-page__content__body">
            <Logo id="login-logo" />

            <div className="input-form--long">
                <input onChange={e => setEmail(e.target.value)} type="text" className="input-form--long__input" id="email" placeholder=" " />
                <label className="input-form--long__label" htmlFor="email">Email</label>
            </div>

            <div className="input-form--long">
                <input onChange={e => setPassword(e.target.value)} type="password" className="input-form--long__input" id="password" placeholder=" " />
                <label className="input-form--long__label" htmlFor="password">Password</label>
            </div>

            <div className="login-page__content__body__remember-me">
                <input type="checkbox" id="remember-user" name="remember-user" value="" />
                <label htmlFor="remember-user">Remember my log in information</label><br></br>
            </div>
        </div>
    )
}
