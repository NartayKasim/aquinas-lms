import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoginBody from './LoginBody';
import RegisterBody from './RegisterBody';
import requireAuth from '../../auth/requireAuth';


const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [register, setRegister] = useState('login');
    const [isInstructor, setIsInstructor] = useState(null);


    const loginUser = () => {
        axios.post('/api/auth/login', { email, password })
            .then(() => props.history.push('/dashboard'))
            .catch(() => setError('Email or password not found'))
    }

    const toggleRegister = (param) => {
        if (param !== register) {
            setRegister(param);
            setError('')
        }
    }

    const onRegisterClick = () => {
        if (password !== verifyPassword) {
            setError('please make sure the passwords match')
        }
        else if (isInstructor === null) {
            setError('please select "instructor" or "student"')
        }
        else {
            const assembledUserObj = {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password,
                "is_instructor": isInstructor
            }

            axios.post('/api/auth/register', assembledUserObj)
                .then(() => props.history.push('/dashboard'))
                .catch(error => setError(error.response.data))
        }
    }

    const sectionInactive = "login-page__content__header--section";
    const sectionActive = sectionInactive + " bold";

    return (
        <div className="login-page__content">
            <div className="login-page__content__header">
                <div className={register === 'login' ? sectionActive : sectionInactive} onClick={() => toggleRegister('login')}>
                    <span>Login</span>
                </div>
                <div className={register !== 'login' ? sectionActive : sectionInactive} onClick={() => toggleRegister('register')}>
                    <span>Register</span>
                </div>
            </div>

            <div className="login-page__content--accent"></div>

            {register === 'login' ? <LoginBody setEmail={setEmail} setPassword={setPassword} error={error} /> : <RegisterBody setEmail={setEmail} setPassword={setPassword} setVerifyPassword={setVerifyPassword} error={error} setFirstName={setFirstName} setLastName={setLastName} setIsInstructor={setIsInstructor} />}

            <div className="login-page__content__footer">
                <span className="error-string">{error ? error : null}</span>
                <button onClick={() => props.history.push('/')} className="button--shaded login-page-buttons">Back</button>
                {
                    register === "login"
                        ?
                        <button onClick={() => loginUser()} className="button--shaded login-page-buttons">Log In</button>
                        :
                        <button onClick={() => onRegisterClick()} className="button--shaded login-page-buttons">Register</button>
                }
            </div>
        </div >
    )
}

export default requireAuth(withRouter(Login));
